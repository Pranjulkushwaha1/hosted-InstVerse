const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
const { mongoUrl } = require('./keys')
const cors = require('cors');
const path = require("path")

app.use(cors())
// const dotenv = require('dotenv');
//schema connect krne ke liye model se
require('./models/model')
require('./models/post')

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));


//data base connect krne ke liye
const mongoose = require('mongoose');
// const { default: Createpost } = require('../frontend/InstaVerse/src/components/Createpost')
mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongodb")
})

// serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/InstaVerse/dist")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/InstaVerse/dist/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    );
});
app.listen(PORT, (req, res) => {
    console.log("server its running " + PORT);
})    