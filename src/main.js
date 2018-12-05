const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const logger = require('morgan');
const PORT = process.env.port ? process.env.port : 3001;
const environment = process.env.NODE_ENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());

if (environment !== 'production') {
  app.use(logger('dev'));
  app.use('/', logger('dev'));
}

// 挂载静态文件
app.use('/', express.static(`${__dirname}/html`));

// 登录接口
app.post('/test', (req, res) => {

  console.log('req', req.body);

  res.status(200).send({
    result: 'OK'
  });
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log('server is listening at ', PORT);
})