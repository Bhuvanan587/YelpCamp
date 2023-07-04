const mongoose = require('mongoose');
const Campground = require('../models/campground');
const {places,descriptors} = require('./seedHelpers')
const cities = require('./cities')


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN");
  })
  .catch(err => {
    console.log("OH NO MONGOOSE ERROR");
    console.log(err);
  });

  const sample = array => array[Math.floor(Math.random()*array.length)]

  const seedDb = async() =>{
    await Campground.deleteMany({})
    for(let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random()*1000)
        const camp = new Campground({
        location :`${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
   
  }

  seedDb().then(()=>{
    mongoose.connection.close();
  })