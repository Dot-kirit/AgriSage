import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      district = 'Local Region',
      state = '',
      temperature,
      humidity,
      moisture,
      soilPh,
      targetLanguageName = 'English',
      targetLangCode = 'en',
    } = req.body;

    const projectId = process.env.VERTEX_PROJECT_ID;
    const location = process.env.VERTEX_LOCATION || 'us-central1';
    const clientEmail = process.env.GCP_CLIENT_EMAIL;
    const rawPrivateKey = process.env.GCP_PRIVATE_KEY;

    if (!projectId || !clientEmail || !rawPrivateKey) {
      return res.status(500).json({ error: 'Missing GCP credentials.' });
    }

    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: rawPrivateKey.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const token = (await client.getAccessToken()).token;

    // Get current month to identify the active agricultural season (Kharif, Rabi, Zaid)
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

    const prompt = `You are a precision agronomist and agricultural data scientist.

Analyze these real-time field parameters:
- Location: ${district}, ${state}
- Current Month: ${currentMonth}
- Temperature: ${temperature}°C
- Humidity: ${humidity}%
- Soil Moisture: ${moisture}%
- Soil pH: ${soilPh}

TASK:
1. Determine the SINGLE BEST crop to sow or cultivate right now under these specific environmental and seasonal conditions.
2. Determine the WORST / LEAST SUITABLE crop that will likely fail or cause financial loss under these conditions.
3. Translate all explanation fields completely into ${targetLanguageName} (${targetLangCode}).

Respond ONLY with valid JSON in this exact structure:
{
  "bestCrop": {
    "name": "[Name of best crop in ${targetLanguageName}]",
    "expectedYield": "[e.g., 22-25 Quintals/Acre in ${targetLanguageName}]",
    "confidence": 94,
    "reason": "[2-sentence scientific reason explaining why soil pH, moisture, and temperature match this crop in ${targetLanguageName}]",
    "sowingWindow": "[e.g., Late October - Mid November in ${targetLanguageName}]"
  },
  "worstCrop": {
    "name": "[Name of worst crop in ${targetLanguageName}]",
    "riskLevel": "High Risk",
    "confidence": 88,
    "reason": "[2-sentence reason explaining why current temperature/moisture/season makes this crop vulnerable in ${targetLanguageName}]",
    "primaryThreat": "[e.g., Root Rot / Heat Stress / Fungal Outbreak in ${targetLanguageName}]"
  }
}`;

    const vertexGeminiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

    const vertexRes = await fetch(vertexGeminiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: 'application/json',
          temperature: 0.2,
        },
      }),
    });

    if (!vertexRes.ok) {
      throw new Error(await vertexRes.text());
    }

    const geminiData = await vertexRes.json();
    let rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    const recommendations = JSON.parse(rawText.replace(/```json/gi, '').replace(/```/g, '').trim());

    return res.status(200).json(recommendations);
  } catch (err) {
    console.error('Crop Recommendation API Error:', err);
    return res.status(500).json({ error: err.message });
  }
}