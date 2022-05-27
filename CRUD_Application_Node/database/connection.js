const mongoose = require('mongoose');

const connectDB = async () => {


    const database = process.env.MONGOLAB_URI;
    mongoose
      .connect(database, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
      .then(() => console.log("everything connected perfectly"))
      .catch((err) => console.log(err));


}

module.exports = connectDB