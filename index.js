const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    return res.status(200).json({
        status: "ok",
        message: "Welcome to API!"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
});