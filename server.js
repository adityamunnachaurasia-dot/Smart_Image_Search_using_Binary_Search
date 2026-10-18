import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './config/db.js';
import { fetchAllImages } from './services/imageService.js';
import { searchIndex } from './services/searchIndex.js';
import imageRoutes from './routes/imageRoutes.js';
import metaRoutes from './routes/metaRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { UPLOAD_DIR } from './middleware/upload.js';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

// Serve static uploads
app.use('/uploads', express.static(UPLOAD_DIR, { fallthrough: true }));

app.use('/api/images', imageRoutes);
app.use('/api', metaRoutes);
app.use('/api/chat', chatbotRoutes);

app.get('/api/health', (_req, res) => res.json({ ok: true, indexSize: searchIndex.size }));

app.use(errorHandler);

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  try {
    // Sanity-check DB
    const [ping] = await pool.query('SELECT 1');
    if (!ping) throw new Error('DB ping failed');

    // Load all images and build the sorted index ONCE at startup.
    const all = await fetchAllImages();
    searchIndex.rebuild(all);
    console.log(`Search index ready: ${searchIndex.size} entries, ${all.length} images.`);

    app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Bootstrap failed:', err.message);
    process.exit(1);
  }
}
bootstrap();