require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const videosRoutes = require('./routes/videosRoutes.js');
const PORT = process.env.PORT || 8000;

// For server side rendering. We'll render the api info html file using the views folder
// app.set("view engine", "ejs");

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/videos', videosRoutes);


// If someone tries to go to the '/' page, we send them the home.ejs document, which is our documentation HTML file
app.get('/', (_req, res) => {
    res.send("home");
});

app.listen(PORT, ()=> {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});