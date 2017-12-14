'use strict';

let ContactsDB = require('../models/contacts_db');
let Joi = require('joi');
let IsEmpty = require('is-empty');
let ErrorUtil = require('../utils/error_util');

exports.addContact = async params => {
    if (!await _validateAddContactParams(params)) {
        throw ErrorUtil.createError(ErrorUtil.ErrorSet.REQUEST_PARAMETER_ERROR);
    }
    let data = await ContactsDB.addContact(params);
    data.contact_id = data._id;
    delete data._id;
    return {result: data};
}

async function _validateAddContactParams(params) {
    // TODO
    return false;
}