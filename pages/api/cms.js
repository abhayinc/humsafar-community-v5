import fs from 'fs/promises';
import path from 'path';

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
      await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8');
      res.status(200).json({ success: true, message: 'Data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to write data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
