const express = require("express");
const {sendResponse} = require("../helper/helper")
const teacherModel = require("../models/teacherModel")

const route = express.Router();
route.get("/", async (req, res) => {
    try {
      const result = await teacherModel.find();
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
route.get("/:id", (req, res) => {});
route.post("/", async (req, res) => {
  let { name,cource, contact } = req.body;
  try {
    let errArr = [];

    if (!name) {
      errArr.push("Required :  Name");
    }
    if (!cource) {
      errArr.push("Required : cource");
    }
     if (!contact) {
      errArr.push("Required : Contact");
    }
    if (errArr.length > 0) {
      res
        .send(sendResponse(false, errArr, null, "Required All Fields"))
        .status(400);
      return;
    } else {
      let obj = {name,cource, contact};
      let teacher = new teacherModel(obj);
      await teacher.save();
      if (!teacher) {
        res
          .send(sendResponse(false, null, "Internal Server Error"))
          .status(400);
      } else {
        res.send(sendResponse(true, teacher, "Saved Successfully")).status(200);}
    }
  } catch (e) {
    res.send(sendResponse(false, null, "Internal Server1 Error"));
  }
});
route.put("/:id", (req, res) => {});
route.delete("/:id", (req, res) => {});

module.exports = route;
