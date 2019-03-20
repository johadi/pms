import * as express from 'express';
import db = require('../../database/models');
import {handleError, handleSuccess} from "../helpers/helpers";



export class Location {
  static add(req: express.Request, res: express.Response) {

    return db.Location.findOrCreate({where: req.body})
      .then(([location, created]: any[]) => {
        if (!created) {
          return Promise.reject({code: 409, message: 'This location already exists'});
        }

        return handleSuccess({code: 201, data: location}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static get(req: express.Request, res: express.Response) {
    if (!req.params.name) {
      return Promise.reject({code: 400, message: 'Parameter name is required'});
    }

    return db.Location.findOne({where: { name: req.params.name }, include: { association: 'childLocation' } })
      .then((location: any) => {
        if (!location) {
          return Promise.reject({code: 404, message: 'Location not found'});
        }

        return handleSuccess({code: 200, data: location}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static update(req: express.Request, res: express.Response) {
    if (!req.params.name) {
      return Promise.reject({code: 400, message: 'Parameter name is required'});
    }

    return db.Location.findOne({where: { name: req.params.name }})
      .then((location: any) => {
        if (!location) {
          return Promise.reject({code: 404, message: 'Location not found'});
        }

        return location.update(req.body);
      })
      .then((updatedLocation: any) => handleSuccess({code: 200, data: updatedLocation}, res))
      .catch((err: any) => handleError(err, res));
  }

  static getAll(req: express.Request, res: express.Response) {

    return db.Location.findAll({ include: { association: 'childLocation' } })
      .then((locations: any[]) => {
        if (locations.length === 0) {
          return Promise.reject({code: 404, message: 'No location found'});
        }

        return handleSuccess({code: 200, data: locations}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static delete(req: express.Request, res: express.Response) {
    if (!req.params.name) {
      return Promise.reject({code: 400, message: 'Parameter name is required'});
    }

    return db.Location.findOne({where: { name: req.params.name }})
      .then((location: any) => {
        if (!location) {
          return Promise.reject({code: 404, message: 'Location not found'});
        }

        return location.destroy();
      })
      .then(() => handleSuccess({code: 200, data: 'Location deleted'}, res))
      .catch((err: any) => handleError(err, res));
  }
}
