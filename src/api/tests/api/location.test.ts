// location.test.ts
import * as request from 'supertest';
import * as dotenv from 'dotenv';
import {assert} from 'chai';
import {app} from "../../app";
import db = require('../../../database/models');


dotenv.config();

describe('Location test', () => {
  before((done) => {
    db.Location.destroy({truncate: true})
      .then(() => done())
      .catch((err: any) => done(err));
  });

  after((done) => {
    db.Location.destroy({truncate: true})
      .then(() => done())
      .catch((err: any) => done(err));
  });

  describe('Base test API', () => {
    // Test for API home route and invalid routes
    it('Should return status code 404 when user accesses non-existing route',
      (done) => {
        request(app)
          .get('/api/xytszdhhj')
          .expect(404)
          .end(done);
      });

    it('Should return status code 200 when the base route is accessed',
      (done) => {
        request(app)
          .get('/')
          .expect(200)
          .end(done);
      });
  });

  describe('[POST: /api/location] When user wants to create location', () => {
    const existingLocation = {name: 'kebbi', maleNo: 30, femaleNo: 60};

    before((done) => {
      db.Location.create(existingLocation)
        .then(() => done())
        .catch((err: any) => done(err));
    });

    it('Should return status code 400 when user does not provide location name to create',
      (done) => {
        request(app)
          .post('/api/location')
          .send({})
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.name[0], 'The name field is required.');
            done();
          });
      });

    it('Should return status code 404 when user tries to create a location with non-existing parent location',
      (done) => {
        request(app)
          .post('/api/location')
          .send({parentLocation: 'thailand', name: 'manchester'})
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Parent location not found.');
            done();
          });
      });

    it('Should return status code 409 when user input existing location',
      (done) => {
        request(app)
          .post('/api/location')
          .send(existingLocation)
          .expect(409)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'This location already exists');
            done();
          });
      });

    it('Should create location and return status code 201 when user input a new location details',
      (done) => {
        const newLocation = {name: 'lagos', maleNo: 40, femaleNo: 70};
        request(app)
          .post('/api/location')
          .send(newLocation)
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.name, newLocation.name);
            assert.equal(res.body.maleNo, newLocation.maleNo);
            assert.equal(res.body.femaleNo, newLocation.femaleNo);
            done();
          });
      });
  });

  describe('[GET: /api/location/:name] When user wants to get a location', () => {
    const existingLocation = {name: 'benue', maleNo: 50, femaleNo: 30};

    before((done) => {
      db.Location.create(existingLocation)
        .then(() => done())
        .catch((err: any) => done(err));
    });

    it('Should return status code 404 when user wants to get a location that does not exist',
      (done) => {
        request(app)
          .get('/api/location/xyz')
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Location not found');
            done();
          });
      });

    it('Should return location details and status code 200 when user tries to get location using a valid location name',
      (done) => {
        request(app)
          .get(`/api/location/${existingLocation.name}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.name, existingLocation.name);
            assert.equal(res.body.maleNo, existingLocation.maleNo);
            assert.equal(res.body.femaleNo, existingLocation.femaleNo);
            done();
          });
      });

  });

  describe('[PATCH: /api/location/:name] When user wants to update an existing location', () => {
    const existingLocation = {name: 'ogun', maleNo: 50, femaleNo: 90};
    const updatingData = {maleNo: 80, femaleNo: 100};

    before((done) => {
      db.Location.create(existingLocation)
        .then(() => done())
        .catch((err: any) => done(err));
    });

    it('Should return status code 404 when user tries to update non-existing location',
      (done) => {
        request(app)
          .patch('/api/location/cheetah')
          .send(updatingData)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Location not found');
            done();
          });
      });

    it('Should update location and return status code 200 when user updates a location using valid location name',
      (done) => {
        request(app)
          .patch(`/api/location/${existingLocation.name}`)
          .send(updatingData)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.name, existingLocation.name);
            assert.equal(res.body.maleNo, updatingData.maleNo);
            assert.equal(res.body.femaleNo, updatingData.femaleNo);
            done();
          });
      });
  });

  describe('[GET: /api/locations] When user wants to get all locations', () => {
    // Empty the location database
    before((done) => {
      db.Location.destroy({truncate: true})
        .then(() => done())
        .catch((err: any) => done(err));
    });

    describe('When there is no locations to get', () => {

      it('Should return status code 404 when user tries to get all locations but none exists',
        (done) => {
          request(app)
            .get('/api/locations')
            .expect(404)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body, 'No location found');
              done();
            });
        });
    });

    describe('When there are locations to get', () => {

      const locations = [
        { name: 'canada', maleNo: 300, femaleNo: 200 },
        { name: 'nigeria', maleNo: 203, femaleNo: 107 },
        { name: 'china', maleNo: 500, femaleNo: 350 }
      ];

      before((done) => {
        db.Location.bulkCreate(locations)
          .then(() => done())
          .catch((err: any) => done(err));
      });

      it('Should return status code 200 when user tries to get locations that are available',
        (done) => {
          request(app)
            .get('/api/locations')
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body.length, locations.length);
              done();
            });
        });
    });
  });

  describe('[DELETE: /api/location/:namre] When user wants to delete a location', () => {
    const existingLocation = {name: 'abuja', maleNo: 150, femaleNo: 230};

    before((done) => {
      db.Location.create(existingLocation)
        .then(() => done())
        .catch((err: any) => done(err));
    });

    it('Should return status code 404 when user tries to delete a location that does not exist',
      (done) => {
        request(app)
          .delete('/api/location/xyz')
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Location not found');
            done();
          });
      });

    it('Should return success message when user deletes a location using a valid location name',
      (done) => {
        request(app)
          .delete(`/api/location/${existingLocation.name}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Location deleted');
            done();
          });
      });

  });

})
