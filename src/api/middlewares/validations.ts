import * as express from 'express';
import db = require('../../database/models');
import * as Validator from 'validatorjs';
import { handleError } from "../helpers/helpers";

/**
 * Middleware function for validating a location creation
 * @function validateCreateLocation
 * @param {object} req - request parameter
 * @param {object} res - response parameter
 * @param {object} next - next parameter
 * @return {object} response detail
 */
export const validateCreateLocation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const validator = new Validator(req.body, db.Location.createRules());
  if (validator.fails()) {
    return handleError({code: 400, message: validator.errors.all()}, res);
  }

  if (!req.body.parentLocation) {
    return next();
  }

  db.Location.findOne({where: {name: req.body.parentLocation}})
    .then((foundLocation: any) => {
      if (!foundLocation) {
        return handleError({code: 404, message: 'Parent location not found'}, res);
      }

      req.body.parentLocationId = foundLocation.id;
      delete req.body.parentLocation;

      return next();
    })
}