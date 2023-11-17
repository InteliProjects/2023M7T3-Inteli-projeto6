require("express-async-errors");
require("dotenv").config();
var Parser = require("body-parser");
const cors = require("cors");
const express = require('express')
const port = process.env.port || 8000;
const app = express()
const log4js = require('log4js');
const userRouter = require("./routes/user");
const communicationRouter = require("./routes/communication")
const hookRouter = require('./routes/hooks')

app.use(cors());

app.use(express.json());

app.use(Parser.urlencoded({
  extended: true
}));

log4js.configure({
  appenders: {
    multi: {
      type: "multiFile",
      base: "logs/",
      property: "categoryName",
      extension: ".log",
    },
  },
  categories: {
    default: { appenders: ["multi"], level: "debug" },
  },
});

app.use("/v1/user", userRouter);
app.use("/v1/communication", communicationRouter);
app.use("/v1/hook", hookRouter);

app.get('/', (req, res) => {
  res.send('Sua aplicação está rodando! Seja bem-vindo ao backend do grupo :)')
})

app.use((req, res, next) => {
  res.status(404).send({
    error: "Não encontrado",
    status: 404,
    url: req.url
  });
})

app.listen(port, () => {
  console.log(`Seu servidor está aqui: http://localhost:${port}`)
})