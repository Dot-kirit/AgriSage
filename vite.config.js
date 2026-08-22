import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cropDiagnosisHandler from './api/crop-diagnosis.js';
import chatHandler from './api/chat.js'; // 1. Import chat handler

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        // Body parser helper for raw requests
        const parseBody = (req) =>
          new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                resolve(JSON.parse(body || '{}'));
              } catch {
                resolve({});
              }
            });
          });

        server.middlewares.use(async (req, res, next) => {
          // Wrap express-like res helpers
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };

          if (req.url === '/api/crop-diagnosis' && req.method === 'POST') {
            req.body = await parseBody(req);
            return cropDiagnosisHandler(req, res);
          }

          if (req.url === '/api/chat' && req.method === 'POST') {
            req.body = await parseBody(req);
            return chatHandler(req, res); // 2. Handle /api/chat
          }

          next();
        });
      },
    },
  ],
});