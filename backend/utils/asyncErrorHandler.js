const CustomError = require("./customError");

const asyncErrorHandler = (fun) => (req , res ,next) =>{
        fun(req , res , next).catch((error) =>
             next(error)
        )
}

module.exports = asyncErrorHandler ;