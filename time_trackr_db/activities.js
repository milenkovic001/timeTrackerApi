const express = require("express");
const router = express.Router();
const { Activities } = require("./models/activities");

router.get("/", async (req, res) => {
  //provera da li je ulogovan
  // let data = await Activities.findOne({ email: req.body.email });
  let data = await Activities.findOne({ email: "batman@mejl.com" }).select(
    "activities.name activities.color"
  );
  if (!data) return res.status(400).send("User does not exist");
  res.send(data.activities);
});

router.post("/", async (req, res) => {
  //optimizuj da ne uzima sve i da ne vraca sve (ako moze)
  const query = await Activities.findOne({ email: "batman@mejl.com" });
  // const query = await Activities.findOne({ email:  req.body.email, });
  if (!query) {
    const newAction = new Activities({
      // email: req.body.email,
      email: "batman@mejl.com",
      activities: req.body.activities,
    });
    await newAction.save();
    res.send(newAction);
    return;
  }
  query.activities.push({
    name: req.body.activities.name,
    color: req.body.activities.color,
  });
  await query.save();
  //const result = await addAction.save();
  console.log(query);
  res.send(query);
});
//dodaj aktivnost

//izbrisi aktivnost

//dodaj grupu

//izbrisi grupu

module.exports = router;
