import express from "express";
import bodyParser from "body-parser";

const port = 8080;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send("pong!");
});

// app.post("/contact", (req, res) => {
//     console.log(req.body)
//     // console.log(req.body.contactemail)
//     // console.log(req.body.contactphone)
//     // console.log(req.body.contactphone)
//     res.redirect("/#success")
// })

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
