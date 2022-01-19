const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // da moze da cita podatke iz <form>
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const timeLine = require("./timeLine");
const statistic = require("./statistic");
const login = require("./login");
const activities = require("./activities");
const singup = require("./singup");

// const { Activities } = require("./models/activities");
// const { User } = require("./models/user");

//const DB = 'mongodb+srv://tiem_tracker:tajnasupersifra@timetracker.mabej.mongodb.net/Time_tracker?retryWrites=true&w=majority'
const DB = "mongodb://localhost:27017";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use("/time-line", timeLine);
app.use("/statistic", statistic);
app.use("/activities", activities);
app.use("/login", login);
app.use("/singup", singup);

mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("connected to db..."))
  .catch((er) => console.error("Couldn't connecte to db", er));

// async function addAction(email, action) {
//   const query = await User.findOne({ email: email });
//   if (!query) {
//     console.log("korisnik ne postoji");
//     return;
//   }

//   const repAction = query.activities.find((el) => el.name === action.name);
//   if (repAction) {
//     console.log("vec postoji ta aktivnost");
//     return;
//   }

//   //let inc = query.activities.length + 1
//   //let inc = query.activities.sort((a, b) => b.id - a.id)[0];
//   query.activities.push({
//     id: inc,
//     name: action.name,
//     color: action.color,
//   });
//   query.save();
//   console.log(query);
// }
// addAction("neki@mejl.com", { name: "AI", color: "rgb(50, 50, 100)" });

// async function newTimeLine(activities, userEmail) {
//   const timeLine = new TimeLine({
//     activities: activities,
//     userEmail: userEmail,
//   });

//   const result = await timeLine.save();
//   console.log(result);
// }

app.get("/", (req, res) => {
  // let test =[]
  // Activiti.find({ 'id': 1 },  function (err, person) {
  //     if (err) return handleError(err);
  //     person.forEach(element => {
  //         test.push(element.color , " " , element.id)
  //         console.log(element.color, ": je id aktivnosit");
  //     });
  //     res.json(test)
  // });
  res.json("pocetna strana");
});

// da se uloguje
//google, fb, twiter?, email adresa

//da unosi kad je sta radio
//id korisnika
//id vremena
//id akcije {odale uzima 3-4 elementa }

//akcije
// unosi, brise

//aktivnost
//unost, zamena, brisanje

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
