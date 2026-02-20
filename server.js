const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');

const app = express();
const port = 3000;

let products = [
    { id: nanoid(6), title: "Ноутбук MacBook Pro 16", category: "Ноутбуки", description: "Мощный ноутбук для разработчиков с чипом M2 Max.", price: 250000, stock: 5, rating: 4.9, image: "https://placehold.co/400x300/1e293b/ffffff?text=MacBook+Pro" },
    { id: nanoid(6), title: "Смартфон iPhone 15 Pro", category: "Смартфоны", description: "Титановый корпус и невероятная камера.", price: 120000, stock: 15, rating: 4.8, image: "https://placehold.co/400x300/1e293b/ffffff?text=iPhone+15" },
    { id: nanoid(6), title: "Механическая клавиатура Keychron Q1", category: "Периферия", description: "Кастомная клавиатура с отличным тайпингом.", price: 18000, stock: 8, rating: 4.7, image: "https://placehold.co/400x300/1e293b/ffffff?text=Keychron+Q1" },
    { id: nanoid(6), title: "Беспроводная мышь Logitech MX Master 3S", category: "Периферия", description: "Лучшая мышь для продуктивной работы.", price: 11000, stock: 20, rating: 4.9, image: "https://placehold.co/400x300/1e293b/ffffff?text=MX+Master+3S" },
    { id: nanoid(6), title: "Монитор LG UltraGear 27", category: "Мониторы", description: "Игровой монитор 144Hz с IPS матрицей.", price: 35000, stock: 12, rating: 4.6, image: "https://placehold.co/400x300/1e293b/ffffff?text=LG+Monitor" },
    { id: nanoid(6), title: "Наушники Sony WH-1000XM5", category: "Аудио", description: "Премиальные наушники с активным шумоподавлением.", price: 32000, stock: 10, rating: 4.8, image: "https://placehold.co/400x300/1e293b/ffffff?text=Sony+XM5" },
    { id: nanoid(6), title: "Планшет iPad Air 5", category: "Планшеты", description: "Тонкий, легкий и мощный планшет на чипе M1.", price: 60000, stock: 7, rating: 4.7, image: "https://placehold.co/400x300/1e293b/ffffff?text=iPad+Air" },
    { id: nanoid(6), title: "Умные часы Apple Watch Series 9", category: "Гаджеты", description: "Ваш личный помощник на запястье.", price: 45000, stock: 18, rating: 4.8, image: "https://placehold.co/400x300/1e293b/ffffff?text=Apple+Watch" },
    { id: nanoid(6), title: "SSD накопитель Samsung 990 Pro 1TB", category: "Комплектующие", description: "Сверхбыстрый SSD для системы и игр.", price: 15000, stock: 30, rating: 4.9, image: "https://placehold.co/400x300/1e293b/ffffff?text=Samsung+SSD" },
    { id: nanoid(6), title: "Микрофон Blue Yeti", category: "Аудио", description: "Студийный USB-микрофон для подкастов и стримов.", price: 13000, stock: 25, rating: 4.5, image: "https://placehold.co/400x300/1e293b/ffffff?text=Blue+Yeti" }
];

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

function findProductOr404(id, res) {
    const product = products.find(p => p.id == id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return null;
    }
    return product;
}

app.get("/api/products", (req, res) => res.json(products));

app.post("/api/products", (req, res) => {
    const { title, category, description, price, stock, rating, image } = req.body;
    const newProduct = {
        id: nanoid(6),
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
        rating: Number(rating) || 0,
        image: image || "https://placehold.co/400x300/1e293b/ffffff?text=No+Image"
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.patch("/api/products/:id", (req, res) => {
    const product = findProductOr404(req.params.id, res);
    if (!product) return;

    const { title, category, description, price, stock, rating, image } = req.body;
    if (title !== undefined) product.title = title.trim();
    if (category !== undefined) product.category = category.trim();
    if (description !== undefined) product.description = description.trim();
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (rating !== undefined) product.rating = Number(rating);
    if (image !== undefined) product.image = image.trim();

    res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;
    if (!products.some((p) => p.id === id)) return res.status(404).json({ error: "Product not found" });
    products = products.filter((p) => p.id !== id);
    res.status(204).send();
});

app.listen(port, () => console.log(`Сервер магазина запущен на http://localhost:${port}`));
