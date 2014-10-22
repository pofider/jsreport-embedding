var express = require('express'),
    path = require("path");

var app = express();
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/example1', function (req, res) {
    res.render('example1.html');
});

app.get('/example2', function (req, res) {
    res.render('example2.html');
});

app.get('/example3', function (req, res) {
    res.render('example3.html');
});



app.get('/example4', function (req, res) {
    res.render('example4.html');
});

app.get('/example4/login', function (req, res) {
    res.cookie('authorization', 'username and password');
    res.redirect("/example4");
});

app.get('/example4/logout', function (req, res) {
    res.clearCookie('authorization');
    res.redirect("/example4");
});

function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
}

app.get('/example4/data', function (req, res) {
    if (!parseCookies(req).authorization) {
        return res.status(401).end("Unauthorized");
    }

    res.send([
        {title: "Invalid html", priority: "important"},
        {title: "Failure on startup", priority: "minor"},
        {title: "Missing validation for email", priority: "medium"},
        {title: "Performance issues", priority: "medium"},
        {title: "Blue screen", priority: "medium"},
        {title: "Double click prevention", priority: "medium"},
        {title: "Reset password", priority: "minor"},
        {title: "Deleting account", priority: "medium"}
    ]);
});

app.get('/example5', function (req, res) {
    res.render('example5.html');
});

app.get('/example5/block', function (req, res) {
    res.cookie('block', 'true');
    res.redirect("/example5");
});

app.get('/example5/unblock', function (req, res) {
    res.clearCookie('block');
    res.redirect("/example5");
});

app.get('/jsreport/authorization/:operation/:itemType/:shortid', function (req, res) {
    console.log("request " + req.url + ":" + JSON.stringify(req.headers));

    if (parseCookies(req).block && req.params.shortid === "byvZXxtkB") {
        return res.status(401).end("Unauthorized");
    }

    res.send("ok");
});

app.listen(9000);
