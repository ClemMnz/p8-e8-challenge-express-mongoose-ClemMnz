// importer les variables d'environnement
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import router from "./router";

const app: express.Express = express();
const PORT = process.env.PORT || 5050;


// setup view engine
app.set('views', 'views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

//db
mongoose
    .connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(() => console.log('Database connected'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 

app.use(session({
  secret: process.env.SECRET,
  resave: false,
 saveUninitialized: true,
}));

//routing
app.use(router);

// lancer l'appli
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
