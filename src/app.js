import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import session from 'express-session';
import flash from 'express-flash';
import path from 'path';

const app = express();
const port = 4000;
const users = [{ id: 'mhjung@sample.com', pw: '12345', name: '명훈' }];

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

app.use(express.static(path.join(__dirname, '/public')));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'jiovfuinewfiuwfe',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use((req, res, next) => {
  app.locals.currentUser = req.session.user;
  app.locals.signedIn = req.session.signedIn;
  next();
});
app.get('/', (req, res) => res.render('home'));
app
  .route('/signin')
  .get((req, res) => res.render('signin', { style: 'signin' }))
  .post((req, res) => {
    const { id, pw } = req.body;
    const user = users.find((u) => u.id === id && u.pw === pw);
    if (user) {
      req.session.user = user;
      req.session.signedIn = true;
      return res.redirect('/');
    } else {
      req.flash('error', 'email 또는 password가 잘못 되었습니다.');
      return res.status(400).render('signin', { style: 'signin' });
    }
  });
app.post('/signout', (req, res) => {
  req.session.user = null;
  req.session.signedIn = false;
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
