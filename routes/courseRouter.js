const express = require("express");
const courseModel = require("../models/courseModel")
const { sendResponse } = require("../helper/helper");

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const result = await courseModel.find();
    if (!result) {
      res.send(sendResponse(false, null, "No Data Found")).status(404);
    } else {
      res.send(sendResponse(true, result)).status(200);
    }
  } catch (e) {
    console.log(e);
    res.send(sendResponse(false, null, "Internal Server Error")).status(400);
  }
});
route.get("/:id", (req, res) => {
  res.send("Get Single Student Data");
});
route.post("/", async (req, res) => {
  let { name, duration,fees,shortname } = req.body;
  try {
    let errArr = [];

    if (!name) {
      errArr.push("Required :  Name");
    }
    if (!duration) {
      errArr.push("Required :  Duration");
    }
    if (!shortname) {
      errArr.push("Required : Short Name");
    }
    if (!fees) {
      errArr.push("Required : fees");
    }
    if (errArr.length > 0) {
      res
        .send(sendResponse(false, errArr, null, "Required All Fields"))
        .status(400);
      return;
    } else {
      let obj = { name, duration,fees,shortname};
      let course = new courseModel(obj);
      await course.save();
      if (!course) {
        res
          .send(sendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res.send(sendResponse(true, course, "Saved Successfully")).status(200);
      }
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Servre Error"));
  }
});
route.put("/:id", (req, res) => {
  res.send("Edit Student Data");
});
route.delete("/:id", (req, res) => {
  res.send("Delete Student");
});

module.exports = route;
