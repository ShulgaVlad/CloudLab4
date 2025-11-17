const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const REGION = process.env.GCP_REGION || 'unknown';

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

app.all('/', (req, res) => {
  let guestName = 'world';
  if (req.query && req.query.name) {
    guestName = req.query.name;
  } 
  else if (req.method === 'POST') {
    if (req.body && req.body.name) {
      guestName = req.body.name;
    }
  }

  const responsePayload = {
    hello: guestName,
    runtime: 'nodejs',
    region: REGION
  };

  res.status(200).json(responsePayload);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
