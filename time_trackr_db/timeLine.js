const express = require("express");
const router = express.Router();
const { TimeLine } = require("./models/timeLine");
const { User } = require("./models/user");

router.get("/", async (req, res) => {
  //provera da li je ulogovan
  // let data = await TimeLine.findOne({ email: req.body.email });
  let data = await TimeLine.findOne({ email: "batman@mejl.com" });
  if (!data) return res.status(400).send("User does not exist");
  res.send(data.activities);
});

//upisuje u bazu ili izmeni vec upisano  mora da ima i brisanje
router.post("/", async (req, res) => {
  // console.log(req.body, "ovo je request");
  let data = await TimeLine.findOne({ email: req.body.email });
  if (!data) {
    const newTimeLine = new TimeLine({
      email: req.body.email,
      activities: [
        {
          name: req.body.activities.name,
          color: req.body.activities.color,
          year: req.body.activities.year,
          month: req.body.activities.month,
          day: req.body.activities.day,
          time: req.body.activities.time,
          // group: req.body.group,
        },
      ],
    });

    await newTimeLine.save();
    res.send(newTimeLine);
    return;
  }

  data.activities.push({
    name: req.body.activities.name,
    color: req.body.activities.color,
    year: req.body.activities.year,
    month: req.body.activities.month,
    day: req.body.activities.day,
    time: req.body.activities.time,
    // group: req.body.group,
  });
  await data.save();
  res.send(data);
  return;

  // privremenaFunkcija("ime", "boja", 2022, 1, 21, "22:30");

  //   //  email, year, activities: array[{date, activiti_id, name}, {}, {}} , email, year
  //   const user = await User.findOne({ email: req.body.email });
  //   if (!user) return res.status(400).send("User not found");
  //   const userActivitiId = user.activities.find(
  //     (e) => e.id == req.body.activities.action_id
  //   );
  //   if (!userActivitiId)
  //     return res.status(400).send("User dont have sent activiti");
  //   let myCurrentDate = new Date();
  //   let myPastDate = new Date(myCurrentDate);
  //   myPastDate.setHours(myPastDate.getHours() - 61);
  //   let myFutureDate = new Date(myCurrentDate);
  //   myFutureDate.setHours(myFutureDate.getHours() + 36);
  //   let pastLimit = parseInt(
  //     myPastDate.getFullYear() +
  //       ("00" + (myPastDate.getMonth() + 1)).slice(-2) +
  //       ("00" + myPastDate.getDate()).slice(-2) +
  //       ("00" + myPastDate.getHours()).slice(-2) +
  //       ("00" + myPastDate.getMinutes()).slice(-2),
  //     10
  //   );
  //   let futureLimit = parseInt(
  //     myFutureDate.getFullYear() +
  //       ("00" + (myFutureDate.getMonth() + 1)).slice(-2) +
  //       ("00" + myFutureDate.getDate()).slice(-2) +
  //       ("00" + myFutureDate.getHours()).slice(-2) +
  //       ("00" + myFutureDate.getMinutes()).slice(-2),
  //     10
  //   );
  //   //moze da bude globalna koja se ponavlja na 30 minuta ???
  //   let minutLimit = req.body.activities.date % 100;
  //   let hourLimt = parseInt(req.body.activities.date / 100) % 100;
  //   let dayLimt = parseInt(req.body.activities.date / 10000) % 100;
  //   let monthLimt = parseInt(req.body.activities.date / 1000000) % 100;
  //   let year = parseInt(req.body.activities.date / 100000000);
  //   if (
  //     !(
  //       (minutLimit == 30 || minutLimit == 0) &&
  //       hourLimt >= 0 &&
  //       hourLimt <= 23 &&
  //       dayLimt >= 1 &&
  //       dayLimt <= 31 &&
  //       monthLimt >= 1 &&
  //       monthLimt <= 12
  //     )
  //   )
  //     return res.status(400).send("Unvalid date format");
  //   if (
  //     req.body.activities.action_id > futureLimit &&
  //     req.body.activities.action_id < pastLimit &&
  //     Number.isInteger(req.body.activities.action_id)
  //   )
  //     return res.sendStatus(400).send("Out of time limit");
  //   //ako ima da apdejtuje\
  //   let userTimeLine = await TimeLine.findOne({
  //     email: req.body.email,
  //     year: year,
  //   });
  //   if (!userTimeLine) {
  //     const data = new TimeLine({
  //       email: req.body.email,
  //       year: year,
  //       activities: [
  //         {
  //           date: req.body.activities.date,
  //           activiti_id: req.body.activities.action_id,
  //           activiti_name: userActivitiId.name,
  //         },
  //       ],
  //     });
  //     await data.save();
  //     res.sendStatus(200);
  //   } else {
  //     let actionDate = userTimeLine.activities.find(
  //       (e) => e.date === req.body.activities.date
  //     );
  //     if (!actionDate) {
  //       userTimeLine.activities.push({
  //         date: req.body.activities.date,
  //         activiti_id: req.body.activities.action_id,
  //         activiti_name: userActivitiId.name,
  //       });
  //       await userTimeLine.save();
  //       res.sendStatus(200);
  //     } else {
  //       if (req.body.activities.action_id !== actionDate.action_id) {
  //         await userTimeLine.updateOne({ $pullAll: { activities: [actionDate] } });
  //         await userTimeLine.updateOne({
  //           $push: {
  //             activities: {
  //               $each: [
  //                 {
  //                   date: req.body.activities.date,
  //                   activiti_id: req.body.activities.action_id,
  //                   activiti_name: userActivitiId.name,
  //                 },
  //               ],
  //               $sort: { date: 1 },
  //             },
  //           },
  //         });
  //         res.sendStatus(200);
  //       } else res.sendStatus(200);
  //       //userTimeLine.deleteOne({activities.date: req.body.activities.date} )
  //       // userTimeLine.activities.push({date: req.body.activities.date, activiti_id: req.body.activities.action_id, activiti_name: userActivitiId.name})
  //       // await userTimeLine.save()
  //       // console.log(test)
  //       // res.sendStatus(200)
  // }
  //   }
});

//izbaci validaciju iz funkcije

module.exports = router;
