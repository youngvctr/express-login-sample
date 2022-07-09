import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { engine } from 'express-handlebars';

const app = express();
const port = 4000;

app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(helmet());
app.use(morgan('dev'));

app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
