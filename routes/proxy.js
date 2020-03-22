var express = require('express');
var request = require('request');


module.exports = function (router) {

    proxyRoute = router.route('/');
    proxyRoute.get((req, res) => {
        let { startIndex, count } = req.query;
        let url = 'https://ign-apis.herokuapp.com/videos/?startIndex=' + startIndex + '&count=' + count;
        request.get(url, (error, response, resBody) => {
            if (error) {
                res.send(error)
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.send(resBody);
            }
        });
    })
    return router;
}

