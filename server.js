// backend/server.js

const express = require('express');
const cors = require('cors');
const { CommunicationIdentityClient } = require('@azure/communication-identity');

const app = express();
app.use(cors());
app.use(express.json());

const connectionString = 'endpoint=https://my-acs-demo.india.communication.azure.com/;accesskey=EUiUxWhI7E7kbmB59uPmOPFJaO4Nh0bvVPvC61dxt187eA7pKQlVJQQJ99BFACULyCpAzIK2AAAAAZCSwdag';

app.get('/token', async (req, res) => {
  try {
    const identityClient = new CommunicationIdentityClient(connectionString);
    const response = await identityClient.createUserAndToken(['voip']);

    res.json({
      token: response.token,
      userId: response.user.communicationUserId,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Token generation failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`ACS Token Server running on http://localhost:${PORT}`);
});
