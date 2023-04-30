const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.port || 5000;
const connection = require('./database/mongodb');
const authRouter = require('./routers/auth.router');

app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World Json!' })
});

app.listen(port, () => {
    console.log(`Bağlantı Başarılı. http://localhost:${port} portu ile bağlandınız.`)
});

