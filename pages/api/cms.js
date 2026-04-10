import fs from 'fs/promises';
import path from 'path';
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Simple password check using Authorization header
  const authHeader = req.headers.authorization;
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (authHeader !== `Bearer ${password}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const dataFilePath = path.join(process.cwd(), 'data', 'data.json');

  if (req.method === 'GET') {
    try {
      // 1. Read from KV first
      const kvData = await kv.get('humsafar_cms_data');
      if (kvData && kvData.SITE) {
        return res.status(200).json(kvData);
      }
      
      // 2. Fallback to local Dev file
      const fileData = await fs.readFile(dataFilePath, 'utf8');
      res.status(200).json(JSON.parse(fileData));
    } catch (error) {
      res.status(500).json({ error: 'Failed to read data' });
    }
  } else if (req.method === 'PUT' || req.method === 'POST') {
    try {
      const newData = req.body;
      // We expect the whole state { SITE, TOURS, BLOGS, BANNERS }
      if (!newData.SITE || !newData.TOURS) {
        return res.status(400).json({ error: 'Invalid data payload' });
      }

      // 1. Write globally to Vercel KV
      try {
        await kv.set('humsafar_cms_data', newData);
      } catch (kvError) {
        console.error("Failed to write to KV", kvError);
      }

      // 2. Write to local filesystem (works in development only)
      try {
        await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8');
      } catch (fsError) {
        // Ignoring local write errors on serverless
      }

      res.status(200).json({ success: true, message: 'Data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to write data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
