// const { application } = require("express");
const express = require("express");
const { BugModel } = require("../models/bug.model");
const bugRouter = express.Router();

bugRouter.get("/all", async (req, res) => {
  try {
    let bugs = await BugModel.find();
    res.send(bugs);
  } catch (error) {
    console.log(error);
  }
});

// bugRouter.get("/:id", async (req, res) => {
//   let emp_id = req.params.id;
//   try {
//     let bugs = await BugModel.find({ assignedTo: emp_id });
//     res.send(bugs);
//   } catch (error) {
//     console.log(error);
//   }
// });

bugRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const task = new BugModel(payload);
    await task.save();
    res.send("added new task successfully");
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});
bugRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await BugModel.findOne({ _id: id });
  const useridpost = post.userID;
  const useridrequesting = req.body.userID;
  try {
    if (useridrequesting !== useridpost) {
      res.send({ msg: "you are not authorized" });
    } else {
      await BugModel.findOneAndUpdate({ _id: id }, payload);
      res.send("updated the post");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});

bugRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const post = await BugModel.findOne({ _id: id });
  const useridpost = post.userID;
  const useridrequesting = req.body.userID;
  try {
    if (useridrequesting !== useridpost) {
      res.send({ msg: "you are not authorized" });
    } else {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send("updated the post");
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: "something went wrong " });
  }
});

module.exports = { bugRouter };
