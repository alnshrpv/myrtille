const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Настройка для обслуживания статических файлов
app.use(express.static(path.join(__dirname, 'public')));

app.post('/save-user', (req, res) => {
  const userData = req.body;

  fs.appendFile('users.txt', JSON.stringify(userData) + '\n', (err) => {
    if (err) {
      console.error('Error saving data:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.status(200).send('User data saved');
  });
});

// Обработка всех остальных маршрутов и отправка index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
