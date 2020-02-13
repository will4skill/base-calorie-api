const express = require('express');
const app = express();
const cors = require('cors');
const base_calories = require('./routes/base_calories');

app.use(cors());
app.get('/api', (req, res) => {
  const url = "https://github.com/jtimwill/exercise-calorie-api";
  res.send(`See README for API use instructions: ${url}`);
});
app.use(express.json());
app.use('/api/base-calories', base_calories);


const port = 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
