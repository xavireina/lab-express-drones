const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');
 

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];
  
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return Drone.deleteMany()
  })
  .then(() => { 
      return Drone.insertMany(drones, (error, items) => {
        if (error) {
          console.log('An error happened:', error);
          return;
        }
        console.log('The amount of recetas are: ', items.length);
      });

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
