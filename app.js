const express = require('express');
const app = express();
const port = 3000;

let goods = [
    {id: 1, name: "milk", price: 1000},
    {id: 2, name: "bread", price: 1000},
    {id: 3, name: "cucumber", price: 1000}
]

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Главная страница');
});

app.get('/goods', (req, res) => {
	res.send(JSON.stringify(goods));
});

app.get('/goods/:id', (req, res) => {
    let goods = goods.find(u => u.id == req.params.id);
	res.send(JSON.stringify(goods));
});

app.post('/goods', (req, res) => {
	const { name, price } = req.body;

    const newGood = {
        id: Date.now(),
        name,
        price
    };

    goods.push(newGood);
    res.status(201).json(newGood);
});

app.patch('/goods/:id', (req, res) => {
	const good = goods.find(u => u.id == req.params.id);
    const { name, price } = req.body;

    if (name !== undefined) good.name = name;
    if (price !== undefined) good.price = price;

    res.json(good);
});

app.delete('/goods/:id', (req, res) => {
    goods = goods.filter(u => u.id != req.params.id);
	res.send('Ok');
});

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});