const mongoose = require("mongoose");
const Event = require("./models/events");

mongoose.connect(
    "mongodb://localhost:27017/music_network_db",
    { useNewUrlParser: true }
)

mongoose.connection;

var events = [
    {
        name: "One",
        location: "Berlin",
        location_name: "ClubOne",
        price: 11,
        date: "01.01.2022"
    },
    {
        name: "Two",
        location: "Hamburg",
        location_name: "ClubTwo",
        price: 17,
        date: "11.12.2023"
    },
    {
        name: "Three",
        location: "Köln",
        location_name: "ClubThree",
        price: 21,
        date: "08.11.2022"
    },
    {
        name: "Four",
        location: "München",
        location_name: "ClubFour",
        price: 10,
        date: "12.12.2022"
    }
];

Event.deleteMany().exec().then(
    () => {
        console.log("Subscriber data is empty!");
    });

var commands = [];

events.forEach((e) => {
    commands.push(Event.create({
        name: e.name,
        location: e.location,
        location_name: e.location_name,
        price: e.price,
        date: e.date
    }));
});

Promise.all(commands).then(
    r => {
        console.log(JSON.stringify(r));
        mongoose.connection.close();
    }).catch(error => {
        console.log("ERROR ", error);
    });