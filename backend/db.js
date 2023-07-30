const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://tejas03:Tc030602@cluster0.emmdurg.mongodb.net/foodapp?retryWrites=true&w=majority';
const mongoDb = async () => {
  await mongoose.connect(mongoURI, { useNewUrlparser: true }, async (err, result) => {
    if (err) console.log("---", err)
    else {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection("fooditems");
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection("foodcategory");
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.fooditems = data;
            global.foodCategory = catData;

          }

        })
        // if(err) console.log(err);
        // else {
        //   global.fooditems = data;

        // }
      })
    }
  });
}

module.exports = mongoDb;