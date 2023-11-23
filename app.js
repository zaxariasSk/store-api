require('dotenv')
    .config();
require('express-async-errors');

const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');


// middleware
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// products route


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI).then(() => {
            app.listen(PORT, () => {
                console.log('Listening on port ' + PORT);
            });
        }).catch((err) => {
            console.log(err);
        });

    } catch (e) {
        console.log(e)
    }
}

start();
