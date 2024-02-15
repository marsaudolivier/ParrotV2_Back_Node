const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
//configuration des fichiez routes
const annoncesRouter = require('./routes/annonces');
const employerRouter = require('./routes/employer');
const avisRouter = require('./routes/avis');
const avoirRouter = require('./routes/avoir');
const consommerRouter = require('./routes/consommer');
const energiesRouter = require('./routes/energies');
const indexRouter = require('./routes/index');
const formulairesRouter = require('./routes/formulaires');
const joursRouter = require('./routes/jours');
const photosRouter = require('./routes/photos')
const servicesRouter = require('./routes/services')
const motifsRouter = require('./routes/motifs')
const optionsRouter = require('./routes/options')
const connectRouter = require('./routes/connect')
const marquesRouter = require('./routes/marque')
const modeleRouter = require('./routes/modele')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configuration des routes
app.use('/', indexRouter);
app.use('/annonces', annoncesRouter);
app.use('/utilisateurs', employerRouter);
app.use('/Avis', avisRouter);
app.use('/Avoir', avoirRouter);
app.use('/Consommer', consommerRouter);
app.use('/Energies', energiesRouter);
app.use('/Formulaires', formulairesRouter);
app.use('/Jours', joursRouter);
app.use('/Photos', photosRouter);
app.use('/Services', servicesRouter);
app.use('/Motifs', motifsRouter);
app.use('/Options', optionsRouter);
app.use('/Connect', connectRouter);
app.use('/marque', marquesRouter);
app.use('/Modele', modeleRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
app.use('/static', express.static('public'));
