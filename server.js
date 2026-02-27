const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Магазин электроники API',
            version: '1.0.0',
            description: 'API для управления товарами в магазине электроники',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер'
            }
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    required: ['id', 'title', 'category', 'description', 'price', 'stock'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Уникальный идентификатор товара',
                            example: 'abc123'
                        },
                        title: {
                            type: 'string',
                            description: 'Название товара',
                            example: 'Ноутбук MacBook Pro 16'
                        },
                        category: {
                            type: 'string',
                            description: 'Категория товара',
                            example: 'Ноутбуки'
                        },
                        description: {
                            type: 'string',
                            description: 'Описание товара',
                            example: 'Мощный ноутбук для разработчиков с чипом M2 Max.'
                        },
                        price: {
                            type: 'number',
                            description: 'Цена товара в рублях',
                            example: 250000
                        },
                        stock: {
                            type: 'integer',
                            description: 'Количество товара на складе',
                            example: 5
                        },
                        rating: {
                            type: 'number',
                            description: 'Рейтинг товара',
                            example: 4.9
                        },
                        image: {
                            type: 'string',
                            description: 'URL изображения товара',
                            example: 'https://placehold.co/400x300/1e293b/ffffff?text=MacBook+Pro'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Сообщение об ошибке'
                        }
                    }
                }
            }
        }
    },
    apis: ['./server.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получить все товары
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список всех товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get("/api/products", (req, res) => res.json(products));

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создать новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *                 description: Название товара
 *               category:
 *                 type: string
 *                 description: Категория товара
 *               description:
 *                 type: string
 *                 description: Описание товара
 *               price:
 *                 type: number
 *                 description: Цена товара
 *               stock:
 *                 type: integer
 *                 description: Количество на складе
 *               rating:
 *                 type: number
 *                 description: Рейтинг товара
 *               image:
 *                 type: string
 *                 description: URL изображения
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post("/api/products", (req, res) => {
    const { title, category, description, price, stock, rating, image } = req.body;

    if (!title || !category || !description || !price || !stock) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
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

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Название товара
 *               category:
 *                 type: string
 *                 description: Категория товара
 *               description:
 *                 type: string
 *                 description: Описание товара
 *               price:
 *                 type: number
 *                 description: Цена товара
 *               stock:
 *                 type: integer
 *                 description: Количество на складе
 *               rating:
 *                 type: number
 *                 description: Рейтинг товара
 *               image:
 *                 type: string
 *                 description: URL изображения
 *     responses:
 *       200:
 *         description: Товар успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удалить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;
    if (!products.some((p) => p.id === id)) return res.status(404).json({ error: "Product not found" });
    products = products.filter((p) => p.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Сервер магазина запущен на http://localhost:${port}`);
    console.log(`Swagger документация доступна на http://localhost:${port}/api-docs`);
});