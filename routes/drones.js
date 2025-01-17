const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model')

router.get('/drones', (req, res, next) => {
  Drone.find()
      .then(allTheDronesFromDB => {
        console.log('Retrieved drones from DB:', allTheDronesFromDB);
           res.render('drones/list.hbs', { drones: allTheDronesFromDB }); 
      })
      .catch(error => {
        console.log('Error while getting the drones from the DB: ', error);
        next(error);
      });
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form.hbs');
});

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
   Drone.create({ name, propellers, maxSpeed })
    .then(droneFromDB => console.log(`New drone created: ${droneFromDB.name}.`))
    .then(() => res.redirect('/drones'))
    .catch(error => next(error));
});

router.get('/drones/:droneId/edit', (req, res, next) => {
  const { droneId } = req.params;
  Drone.findById(droneId)
    .then(droneToEdit => {
      console.log(droneToEdit);
      res.render('drones/update-form.hbs', { drone: droneToEdit }); 
    })
    .catch(error => next(error));
});

router.post('/drones/:droneId/edit', (req, res, next) => {
  const { droneId } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(droneId, { name, propellers, maxSpeed  }, { new: true })
    .then(() => res.redirect('/drones'))
    .catch(error => next(error));
});

router.post('/drones/:droneId/delete', (req, res, next) => {
  const { droneId } = req.params;
  Drone.findByIdAndDelete(droneId)
    .then(() => res.redirect('/drones'))
    .catch(error => next(error));
});

module.exports = router;
