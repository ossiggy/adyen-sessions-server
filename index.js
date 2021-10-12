require("dotenv").config();
const cors = require("cors");
const express = require("express");
const request = require("request-promise");
const { PORT, API_KEY, CLIENT_ORIGIN } = require("./config");


const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(
  cors({
      origin: CLIENT_ORIGIN
  })
);

app.post('/startSession', async (req, res) => {
  try {
    const options = {
      url: 'https://checkout-test.adyen.com/v68/sessions',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-API-key': API_KEY
      },
      body: req.body,
      json: true
    };

    const result = await request(options);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.json({ error: err.message });
  };
});

app.listen(PORT, () => {
  console.log('Your app is listening on port', PORT);
});