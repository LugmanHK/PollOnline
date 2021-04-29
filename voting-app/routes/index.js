const express = require('express');
const router = express.Router();
router.get('/', (req,res) => {
  res.render('home');
});
router.get('/dashboard', (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/admindashboard', (req,res) => {
  res.render('admindashboard');
});

router.get('/voteddashboard', (req, res) => {
  res.render('voteddashboard');
})

module.exports = router;