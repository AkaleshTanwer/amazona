import express from "express";
import data from "./Data.js";
import dotenv from 'dotenv';
import mongoose from "mongoose";
const app = express();
dotenv.config()
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database Connected")
}).catch((err) => {
    console.log(err.message)
});
app.get('/api/products', async (req, res) => {
    res.send(data.products)
})
app.get('/api/product/slug/:slug', async (req, res) => {
    const product = await data.products.find(x => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product not found" });
    }
})
app.get('/api/product/:id', (req, res) => {
    const product = data.products.find(item => item._Id === req.params.id);
    res.send(product);
})
app.get('/', async (req, res) => {
    res.send("Welcome to the amazona")
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})