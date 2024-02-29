function errorHandler(err, req, res, next) {
    
    const statusCode = err.statusCode || 500;
  
    // Set the response status code
    res.status(statusCode);
  
    // Construct the error response object
    const errorResponse = {
        error: {
            message: err.message || 'Internal Server Error',
            statusCode: statusCode
        }
    };

    res.json(errorResponse);
  }
  
  module.exports = errorHandler;
  