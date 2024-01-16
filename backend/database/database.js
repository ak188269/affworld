const mongoose = require('mongoose');

const startDatabase = async (URI)=>{
  try{
    await mongoose.connect(URI);
    console.log("connected to database");
  }
  catch(e){
console.log("error connecting to database ",e.message);
  }

}

module.exports = startDatabase;