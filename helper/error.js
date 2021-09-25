const errHandler = (err, req, res, next) => {
  let statusCode;
  let errorMessage;
  switch (err.name) {
    default:
      statusCode = 500;
      errorMessage = { code: 500, message: "Internal Server Error" };
      break;
  }

  res.status(statusCode).json(errorMessage);
};

module.exports = errHandler;
