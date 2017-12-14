'use strict';

let chai = require('chai');
let expect = require('chai').expect;
const debug = require('debug')('TEST');

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));

let baseUrl = (process.env.NODE_ENV === 'production') ? 'http://13.230.86.164:20170' : 'http://localhost:20170';
let addContactsJsonSchema = {
    title: 'Add Contacts Response JSON Schema',
    type: 'object',
    required: ['result'],
    properties: {
        result: {
            type: 'object',
            required: ['contact_id', 'phone', 'name'],
            properties: {
                contact_id: {type: 'string'},
                phone: {type: 'string'},
                name: {type: 'string'},
            }
        }
    }
};

describe('Contacts API', () => {
    it('Add Contact', done => {
        let testBody = {
            phone: '18827054817',
            name: 'dian',
            email: 'email@email.com'
        };
        chai.request(baseUrl)
            .post('/contacts')
            .send(testBody)
            .end((err, res) => {
                if (err) {
                    debug(`error => ${err.stack}`);
                    done(err);
                } else {
                    expect(res.body).to.be.jsonSchema(addContactsJsonSchema);
                    debug(`response => ${JSON.stringify(res.body, null, 2)}`);
                    done();
                }
            });
    });

});
