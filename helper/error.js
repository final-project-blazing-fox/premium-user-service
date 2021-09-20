const errHandler = (err, req, res, next)=>{
    let statusCode
    let errorMessage
    switch(err.name){
        case'SequelizeValidationError' : 
            statusCode = 401
            errorMessage = {message: err.errors[0].message}
            break
        case 'ParameterMissingError' :
            statusCode = 400
            errorMessage = {message: err.message}
            break
        default :
            statusCode = 500
            errorMessage = {message: 'Internal Server Error'}
            break
    }

    res.status(statusCode).json(errorMessage)
}

module.exports = errHandler