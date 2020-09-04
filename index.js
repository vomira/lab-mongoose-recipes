const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Recipe.create(data[0])
    // .then(recipe => console.log(recipe.title))
    // .catch(err => console.log(err));
    Recipe.insertMany(data).then(recipes => {
      console.log(recipes.forEach(recipe => console.log(recipe.title)))
    })
    .then(() => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100});
      console.log('The recipe was updated!')
    })
    .then(() => {
      Recipe.deleteOne({title: 'Carrot Cake'});
      console.log(`The recipe was deleted!`)
    })
    .then(() => mongoose.connection.close())
    .catch(err => console.log('Error deleting the data', err))
    .catch(err => console.log('Error updating the data', err))
    .catch(err => console.log('Error inserting the data', err))
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
