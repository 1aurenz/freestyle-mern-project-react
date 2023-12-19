require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoutes = require('./routes/auth');
const routeNews = require('./routes/routeNews');

const User = require("./models/User");


const { MONGO_URL, PORT = 3000, CORS_ORIGIN, JWT_SECRET } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

if (!JWT_SECRET) {
    console.error("Missing JWT_SECRET environment variable");
    process.exit(1);
}

const app = express();

const corsOptions = {
    origin: CORS_ORIGIN,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/favorites', routeNews);



mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
