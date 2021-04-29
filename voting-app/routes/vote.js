const express = require('express');
const router = express.Router();
let {currentName} =require('./users');
const Candidate = require('../models/candidate');
const User = require('../models/User');

router.post("/candidate1", (req,res) => {
  Candidate.updateOne({name:"candidate1"}, {$inc: {vote : 1}}).then(() => {  res.redirect('/voteddashboard') });
})
router.post("/candidate2", (req,res) => {
  Candidate.updateOne({name:"candidate2"}, {$inc: {vote : 1}}).then(() => { res.redirect('/voteddashboard')})
})
router.post("/candidate3", (req,res) => {
  Candidate.updateOne({name:"candidate3"}, {$inc: {vote : 1}}).then(() => { res.redirect('/voteddashboard')})
})
router.post("/candidate4", (req,res) => {
  Candidate.updateOne({name:"candidate4"}, {$inc: {vote : 1}}).then(() => { res.redirect('/voteddashboard')})
})

module.exports = router;