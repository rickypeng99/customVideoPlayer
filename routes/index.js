module.exports = function (app, router) {
    app.use('/api/proxy/', require('./proxy.js')(router));
};