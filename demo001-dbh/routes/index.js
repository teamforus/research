var express = require('express');
var router = express.Router();

var svg_icons = require('../dev/svg-icons-list.json');

var donations = [{
    "name": "Solar panel installations for consumers of >1Kw of electricity",
    "url": "/apply-verification/step-1/",
}, {
    "name": "Children bikes for low income families",
    "url": "/apply-verification/step-1/",
}, {
    "name": "Wheelchair subsidy",
    "url": "/apply-verification/step-1/",
}, {
    "name": "Energizing Development Partnership Programme",
    "url": "/apply-verification/step-1/",
}, {
    "name": "Swimming lessons for people with moving disabilities",
    "url": "/apply-verification/step-1/",
}, {
    "name": "Clean Cooking Program",
    "url": "/apply-verification/step-1/",
}, {
    "name": "Development Related Infrastructure Investment Vehicle (DRIVE)",
    "url": "/apply-verification/step-1/",
}, {
    "name": "Dutch Good Growth Fund (DGGF)",
    "url": "/apply-verification/",
}].map(function(donation, index) {
    return {
        id: index + 1,
        name: donation.name,
        url: donation.url + (index + 1)
    };
});

var JadeData = function(laravel_output) {
    this.svg_icons = svg_icons;
    this.svg_icon = function(name, classes, x, y) {
        if (laravel_output)
            return "{!! svgIcon('" + name + "', '" + (classes || '') + "', " + (x || 'FALSE') + ", " + (y || 'FALSE') + ") !!}";

        x = x || 50;
        y = y || 50;
        classes = classes || '';

        if (classes.length > 0)
            classes = ' ' + classes;

        if (!svg_icons[name]) {
            console.log('cant find ' + name + ' icon');
            return '';
        }

        var svg_icon = svg_icons[name];
        var attributes = 'class="svg-icon svg-' + name + classes + '" ';

        /*attributes += x ? ('width="' + x + '" ') : ''; 
        attributes += y ? ('height="' + y + '" ') : ''; */

        attributes += (x && y) ? ('viewBox="0 0 ' + x + ' ' + y + '" ') : '';
        attributes += 'version="1.1"';

        return svg_icon.replace("<svg>", '<svg ' + attributes + '>');
    };
};

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    data.categories = require('../data/category.json').slice().reverse();
    res.render('index', data);
});

/* GET apply-verification page. */
router.get('/search', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    // fake data
    var results = donations;

    // search
    if (req.query.query) {
        var query = req.query.query.toLowerCase();

        results = results.filter(function(result) {
            return result.name.toLowerCase().indexOf(query) != -1;
        });
    }

    data.query = req.query.query || '';
    data.results = results;

    // sending response
    res.render('search', data);
});

/* GET apply-verification page. */
router.get('/search/api', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    // fake data
    var results = donations;

    // search
    if (req.query.query) {
        var query = req.query.query.toLowerCase();

        results = results.filter(function(result) {
            return result.name.toLowerCase().indexOf(query) != -1;
        }).slice(0, 5);
    }

    // sending response
    res.send(results).end();
});

/* GET apply-verification page. */
router.get('/apply-verification/step-1/:donation_id', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    data.target_donation = donations.filter(function(donate) {
        return donate.id == req.params.donation_id;
    });

    data.target_donation = data.target_donation[0];

    res.render('apply-verification-step-1', data);
});

/* GET apply-verification page. */
router.get('/apply-verification/step-2/:donation_id', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    data.target_donation = donations.filter(function(donate) {
        return donate.id == req.params.donation_id;
    });

    data.target_donation = data.target_donation[0];

    res.render('apply-verification-step-2', data);
});

/* GET donate-category page. */
router.get('/donate-category', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    res.render('donate-category', data);
});

/* GET citizen-list page. */
router.get('/citizen-list', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    res.render('citizen-list', data);
});

/* GET requests page. */
router.get('/requests', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    data.requests = require('../data/seeder/grant-requests.js');
    res.render('requests', data);
});

/* GET make-donation page. */
router.get('/make-donation', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    res.render('make-donation', data);
});

/* GET become-a-supplier page. */
router.get('/become-a-supplier', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    res.render('become-a-supplier', data);
});

/* GET check-token page. */
router.get('/check-token', function(req, res, next) {
    var data = new JadeData();
    data.locals = res.locals;

    res.render('check-token', data);
});

// Create a new contract
router.post('/make-donation', function(req, res) {
    var data = new JadeData();
    data.locals = res.locals;

    var iban = 'adwkdnwld';
    var source = 'Some name';

    res.redirect('/');
});

module.exports = router;