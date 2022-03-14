const express = require("express");
const port = 8080;
const app = express();

app.get("/ping", (req, res) => {
    res.send("pong!")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})