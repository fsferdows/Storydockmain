import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/project.md', (req, res) => {
  res.sendFile(path.join(__dirname, 'project.md'));
});

// Fallback to index.html for unknown routes if needed
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`StoryDock server running on http://0.0.0.0:${PORT}`);
});
