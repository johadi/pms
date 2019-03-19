import * as express from 'express';
/**
 * Helper function that handles error messages
 * @function handleError
 * @param {object} err - error parameter
 * @param {object} res - response parameter
 * @return {object} response detail
 */
const handleError = (err: any, res: express.Response) => {
  switch (err.code) {
    case 400:
      return res.status(400).json(err.message);
    case 403:
      return res.status(403).json(err.message);
    case 404:
      return res.status(404).json(err.message);
    case 409:
      return res.status(409).json(err.message);
    case 422:
      return res.status(422).json(err.message);
    case 500:
      return res.status(500).json(err.message);
    default:
      return res.status(500).json(err);
  }
};

/**
 * Helper function that handles success messages
 * @function handleSuccess
 * @param {number} code - success code parameter
 * @param {object} body - response body
 * @param {object} res - response parameter
 * @return {object} response detail
 */
const handleSuccess = (body: any,  res: express.Response) => {
  switch (body.code) {
    case 201:
      return res.status(201).json(body.data);
    default:
      return res.status(200).json(body.data);
  }
};

export { handleError, handleSuccess }
