// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };

import { handleError } from "./requestHandler.js";

// };
const catchAsync = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then(() => {})
      .catch(async (error) => {
        return handleError({
          res,
          statusCode: error.statusCode || 500,
          err: error.message,
          result: {},
          msg: error.message,
        });
      });
  };
};

export default catchAsync;
