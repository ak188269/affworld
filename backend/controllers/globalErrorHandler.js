const globalErrorHandler = (error , req , res , next) => {
    const filename = error?.stack?.split("at ")?.[1];
  // console.log(error.name , error.message , error.status, "at file " , filename);
    if(error.name === "TokenExpiredError"){
      error.statusCode = 401;
      error.message = "Token expired need to login"
    }
    if(error.name === "ValidationError"){
      console.log(error.code);
      error.statusCode = 400;
      req.shouldDelete = true;
      req.isField = true;
      const errors = Object.values( error.errors).map(err =>err.message);
      error.message = errors.join(" , ");
      if(error.message.includes("Cast to")){
        console.log(error.message);
      error.message = "Internal server error try after some time";
      }
    }
    if(error.name === "AxiosError" && error.code === "ERR_BAD_REQUEST" && error.message.split("code ")[1].trim()==="401"){
      console.log("error uploading ", error.message + filename);
    }

    if(error.name === "TypeError")
    {
      console.log("TypeError " + error.message + " \nAt " + filename);
      error.statusCode ??= 500;
    }

    if (error.name === "ReferenceError") {
      // you can send email to notify in this case
      error.statusCode ??= 500;
      error.message = "Internal server error try later"
      console.log("Reference error: " + error.message + " \nAt" + filename);
    }

    if(error.name === "JsonWebTokenError"){
      error.statusCode ??= 401;
      error.message = "Jwt token error re-check the token or login again"

    }
  
    if(error.name === "MissingSchemaError"){
        error.statusCode ??= 400;
        error.message = "No department with name " + `'${req.department}'`;
      }

    if(error.name === "MongooseError"){
        error.message = "Internal server error";
      }

      
   
  
    
    error.statusCode ??= 500;
    error.message ??= "Internal Server Error Try after some time";
    return res.status(error.statusCode).json({success : false , error : error.message });



}


module.exports = globalErrorHandler;
