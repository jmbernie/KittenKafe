// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
var port = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.resolve('./assets')));
app.use("/assets", express.static(path.join(__dirname, 'assets')));
// Star Wars Characters (DATA)
// =============================================================
var reservations = [
  {
    name: "yoda",
    party: 3,
    phoneNumber: "9199331234",
    //email: "JediMaster@aol.com",
    //uniqueID: 900,
    time: "7:30pm"
  },
  // {
  //   routeName: "darthmaul",
  //   name: "Darth Maul",
  //   role: "Sith Lord",
  //   age: 200,
  //   forcePoints: 1200
  // },
  // {
  //   routeName: "obiwankenobi",
  //   name: "Obi Wan Kenobi",
  //   role: "Jedi Master",
  //   age: 55,
  //   forcePoints: 1350
  // }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/marinaHome", function(req, res) {
  res.sendFile(path.join(__dirname, "marinaHome.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Get all characters
app.get("/all", function(req, res) {
  res.json(reservations);
});

// Search for Specific Character (or all characters) - provides JSON
// app.get("/api/:characters?", function(req, res) {
//   var chosen = req.params.characters;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < characters.length; i++) {
//       if (chosen === characters[i].routeName) {
//         return res.json(characters[i]);
//       }
//     }
//     return res.json(false);
//   }
//   return res.json(characters);
// });

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;
  newReservation.name = newReservation.name.replace(/\s+/g, "").toLowerCase();
  newReservation.party = newReservation.party.replace(/\s+/g, "");
  newReservation.phoneNumber = newReservation.phoneNumber.replace(/\s+/g, "").toLowerCase();
  newReservation.time = newReservation.time.replace(/\s+/g, "").toLowerCase();
  // object example
  // {
  //   name: "yoda",
  //   party: 3,
  //   phoneNumber: "9199331234",
  //   time: "7:30pm"
  // },

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
//app.listen(PORT, function() {
app.listen(port, function() {
  console.log("App listening on PORT " + PORT);
});
