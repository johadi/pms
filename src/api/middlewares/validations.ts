import * as express from 'express';
import db = require('../../database/models');
import * as Validator from 'validatorjs';
import { handleError } from "../helpers/helpers";

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