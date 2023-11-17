require("express-async-errors");
require("dotenv").config();
var Parser = require("body-parser");
const cors = require("cors");
const express = require('express');
const port = process.env.port || 6000;
const app = express();
const hookRouter = require('./routes/webhook')

app.use(cors());
app.use(express.json());
app.use(Parser.urlencoded({
    extended: true
  }));

app.use("/v1/hook", hookRouter);

app.get('/', (req, res) => {
    res.send('Sua aplicação está rodando! Seja bem-vindo à API exclusiva para webhooking xDxD')
  })
  
app.use((req, res, next) => {
    res.status(404).send({
      error: "Não encontrado",
      status: 404,
      url: req.url
    });
})

app.listen(port, () => {
    console.log(`Seu servidor que receberá o hook está aqui: http://localhost:${port}`)
  })