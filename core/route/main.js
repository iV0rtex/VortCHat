function router(app){
    var indexRouter = require('./routes/index');
    var homeRouter = require('./routes/home');
    app.use('/', indexRouter);
    app.use('/home', homeRouter);
}

module.exports = router;