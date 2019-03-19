import * as express from 'express';
import { handleSuccess } from "../helpers/helpers";

export class Location {
  static add(req: express.Request, res: express.Response) {
    return handleSuccess({code: 201, data: 'Success'}, res);
  }
}