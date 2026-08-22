// api/crop-diagnosis.js
import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      imageBase64,
      targetLanguageName = 'English',
      targetLangCode = 'en',
    } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Base64 image is required.' });
    }

    const projectId = process.env.VERTEX_PROJECT_ID;
    const location = process.env.VERTEX_LOCATION || 'us-central1';
    const endpointId = process.env.VERTEX_ENDPOINT_ID;
    const clientEmail = process.env.GCP_CLIENT_EMAIL;
    const rawPrivateKey = process.env.GCP_PRIVATE_KEY;

    if (!projectId || !endpointId || !clientEmail || !rawPrivateKey) {
      return res.status(500).json({
        error: 'Missing required GCP / Vertex credentials in environment variables.',
      });
    }

    const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

    // Authenticate with Google Cloud using Service Account
    const auth = new GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const client = await auth.getClient();
    const token = (await client.getAccessToken()).token;

    // ==========================================
    // STAGE 1: Vertex AI AutoML Leaf Classification
    // ==========================================
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const vertexPredictUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/endpoints/${endpointId}:predict`;

    const vertexResponse = await fetch(vertexPredictUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instances: [{ content: cleanBase64 }],
        parameters: { confidenceThreshold: 0.0, maxPredictions: 10 },
      }),
    });

    if (!vertexResponse.ok) {
      const errText = await vertexResponse.text();
      console.error('Vertex AI Predict Error Response:', errText);
      throw new Error(`Vertex AI Predict failed (${vertexResponse.status}): ${errText}`);
    }

    const predictionData = await vertexResponse.json();
    const firstPrediction = predictionData?.predictions?.[0];
    const displayNames = firstPrediction?.displayNames || [];
    const confidences = firstPrediction?.confidences || [];

    const pairedResults = displayNames.map((name, i) => ({
      label: name,
      confidence: confidences[i] ?? 0,
    }));

    pairedResults.sort((a, b) => b.confidence - a.confidence);

    const topResult = pairedResults[0] || { label: 'Healthy Leaf', confidence: 0.85 };
    const predictedRawLabel = topResult.label;
    const topConfidence = topResult.confidence;
    const confidenceFormatted = `${Math.round(topConfidence * 100)}%`;

    let parsedCrop = 'Crop';
    let parsedDisease = predictedRawLabel;

    if (predictedRawLabel.includes('___')) {
      const parts = predictedRawLabel.split('___');
      parsedCrop = parts[0]?.replace(/_/g, ' ') || 'Crop';
      parsedDisease = parts[1]?.replace(/_/g, ' ') || predictedRawLabel;
    } else if (predictedRawLabel.includes('_')) {
      const parts = predictedRawLabel.split('_');
      parsedCrop = parts[0] || 'Crop';
      parsedDisease = parts.slice(1).join(' ') || predictedRawLabel;
    }

    let finalReport = {
      diseaseDetected: parsedDisease,
      crop: parsedCrop,
      severity: topConfidence > 0.8 ? 'High' : 'Moderate',
      confidence: confidenceFormatted,
      symptoms: `Visual lesions and spotting characteristic of ${parsedDisease}.`,
      recommendedTreatment: `Apply recommended treatments suitable for ${parsedCrop}.`,
      prevention: 'Maintain clean field equipment, crop rotation, and avoid wet foliage overnight.',
    };

    // ==========================================
    // STAGE 2: Multilingual Agronomic Synthesis via Gemini 2.5 Flash
    // ==========================================
    // STAGE 2 Prompt inside api/crop-diagnosis.js:
    const prompt = `You are an expert plant pathologist and agronomist.
Condition:
- Crop: "${parsedCrop}"
- Condition: "${parsedDisease}"
- Confidence: ${confidenceFormatted}

MANDATORY RULES:
1. Keep the JSON keys strictly in ENGLISH (diseaseDetected, crop, severity, confidence, symptoms, recommendedTreatment, prevention).
2. Keep "severity" strictly as one of: "Low", "Moderate", "High", "Critical".
3. Write all text contents (diseaseDetected, crop, symptoms, recommendedTreatment, prevention) entirely in the language "${targetLanguageName}" (Code: "${targetLangCode}").

Respond ONLY with valid JSON (no markdown):
{
  "diseaseDetected": "${parsedDisease} translated in ${targetLanguageName}",
  "crop": "${parsedCrop} translated in ${targetLanguageName}",
  "severity": "Moderate",
  "confidence": "${confidenceFormatted}",
  "symptoms": "Detailed visual symptoms in ${targetLanguageName}",
  "recommendedTreatment": "Treatment instructions in ${targetLanguageName}",
  "prevention": "Practical prevention steps in ${targetLanguageName}"
}`;

    try {
      const vertexGeminiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

      const vertexGeminiRes = await fetch(vertexGeminiUrl, {
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

      if (!vertexGeminiRes.ok) {
        const errBody = await vertexGeminiRes.text();
        console.error('Vertex Gemini 2.5 Flash Error:', vertexGeminiRes.status, errBody);
      } else {
        const geminiData = await vertexGeminiRes.json();
        let rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText) {
          rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(rawText);
          finalReport = { ...finalReport, ...parsed };
        }
      }
    } catch (geminiErr) {
      console.error('Gemini synthesis failed:', geminiErr);
    }

    return res.status(200).json(finalReport);
  } catch (error) {
    console.error('Diagnosis handler error:', error);
    return res.status(500).json({ error: error.message || 'Diagnosis inference failed.' });
  }
}