// api/chat.js
import 'dotenv/config';
import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      messages = [],
      targetLanguageName = 'English',
      targetLangCode = 'en',
    } = req.body;

    if (!messages.length) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const projectId = process.env.VERTEX_PROJECT_ID;
    const location = process.env.VERTEX_LOCATION || 'us-central1';
    const clientEmail = process.env.GCP_CLIENT_EMAIL;
    const rawPrivateKey = process.env.GCP_PRIVATE_KEY;

    if (!projectId || !clientEmail || !rawPrivateKey) {
      return res.status(500).json({
        error: 'Missing Google Cloud credentials in environment variables.',
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

    // Filter out initial bot greetings so history starts with a user message
    const filteredMessages = messages.filter(
      (m) =>
        m.text &&
        !m.text.toLowerCase().includes('hello! i am your') &&
        !m.text.toLowerCase().includes('sorry, i ran into an issue')
    );

    // Build alternating contents strictly conforming to Gemini API specs
    const contents = [];
    for (const msg of filteredMessages) {
      const role = msg.sender === 'user' ? 'user' : 'model';

      // Gemini requires alternating roles; merge consecutive identical turns
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += `\n${msg.text}`;
      } else {
        contents.push({
          role,
          parts: [{ text: msg.text }],
        });
      }
    }

    // Ensure the conversation starts with a user turn
    if (contents.length > 0 && contents[0].role === 'model') {
      contents.shift();
    }

    // Fallback if array ended up empty
    if (contents.length === 0) {
      const lastUserMsg = messages.filter((m) => m.sender === 'user').pop();
      contents.push({
        role: 'user',
        parts: [{ text: lastUserMsg?.text || 'Hello' }],
      });
    }

    const systemInstruction = {
      role: 'system',
      parts: [
        {
          text: `You are AgriSage AI, an expert agricultural advisor and crop specialist.
Answer questions directly and practically regarding crop yields, weather impact, pest management, and fertilizer schedules.
LANGUAGE REQUIREMENT:
Respond naturally and entirely in ${targetLanguageName} (Code: ${targetLangCode}).
Format your answers cleanly using concise paragraphs and lightweight bullet points.`,
        },
      ],
    };

    const vertexGeminiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

    const vertexGeminiRes = await fetch(vertexGeminiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        systemInstruction,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!vertexGeminiRes.ok) {
      const errBody = await vertexGeminiRes.text();
      console.error('Vertex Gemini Chat Error:', vertexGeminiRes.status, errBody);
      return res.status(vertexGeminiRes.status).json({ error: errBody });
    }

    const geminiData = await vertexGeminiRes.json();
    const botReply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'I am currently unable to provide an answer. Please rephrase your question.';

    return res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: error.message || 'Chat service failed.' });
  }
}