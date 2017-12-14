'use strict';

let express = require('express');
let router = express.Router();
let ContactsLogger = require('../logger').ContactsLogger;
let ContactsController = require('../controllers/contacts_controller');

router.post('/', async (req, res, next) => {
    let params = {
        // TODO
    };
    try {
        let result = await ContactsController.addContact(params);
        ContactsLogger.info(`add contact result => ${JSON.stringify(result, null, 2)}`);
        res.json(result);
    } catch(err) {
        ContactsLogger.error(`add contact error => ${err.stack}`);
        next(err);
    }
});

module.exports = router;