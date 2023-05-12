const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.port || 5000;
const path = require('path');
const connection = require('./database/mongodb');
const authRouter = require('./routers/auth.router');
const categoriesRouter = require('./routers/categories.router');
const productRouter = require('./routers/product.router');
const basketRouter = require("./routers/basket.router");
const orderRouter = require("./routers/order.router");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/uploads', express.static('public'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productRouter);
app.use('/api/basket', basketRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World Json!' })
});

app.listen(port, () => {
    console.log(`Bağlantı Başarılı. http://localhost:${port} portu ile bağlandınız.`)
});
