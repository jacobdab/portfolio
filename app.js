var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const proxy = require('http-proxy-middleware');

// Config
const { routes } = require('./config.json');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
const indexRoutes = require('./routes/index');

for (route of routes) {
  app.use(route.route,
      proxy({
        target: route.address,
        pathRewrite: (path, req) => {
          return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
        }
      })
  );
}
app.use('/', indexRoutes);

app.listen(80, () => {
  console.log('Proxy listening on port 80');
});

