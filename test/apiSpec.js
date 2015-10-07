var app = require('../lib/app.js').app;
var chai = require('chai');

var request = require('supertest');
var expect = chai.expect;


describe('Routes', function() {
  describe('REST responses', function() {

    it('should return status code 200 for a valid get request', function(done) {
      request(app)
        .get('/listings')
        .expect(200, done)
    });


    it('should return status code 404 for an invalid get request', function(done) {
      request(app)
        .get('/invalidurl')
        .expect(404, done)
    });
  });

  describe('Data Retrieval', function() {

    it('should return a json object when sending a get request to /listings', function(done) {
      request(app)
        .get('/listings?min_price=297000&max_price=300000&min_bed=3&max_bed=3&min_bath=2&max_bath=2')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { return done(err)}
          done();
        })
    });

    it('should return ignore blank query fields when sending a get request to /listings', function(done) {
      request(app)
        .get('/listings?min_price=297000&max_price=&min_bed=3&max_bed=3&min_bath=2&max_bath=2')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) { return done(err)}
          done();
        })
    });

  });
});
