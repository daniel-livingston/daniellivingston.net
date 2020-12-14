const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const favicon = require("serve-favicon");
const { sendToMe } = require("./email");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, "../public/favicon/favicon.ico")));
app.use(express.static("public"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.post("/email", (req, res) => {
	sendToMe(req, res, { ...req.body, email: req.body.email.trim() });
});

app.get("*", (req, res) => {
	res.redirect("/");
});

app.listen(process.env.PORT);
