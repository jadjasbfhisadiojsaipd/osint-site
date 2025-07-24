const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err || !user) return res.status(401).send('Invalid login');
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).send('Wrong password');

    req.session.user = user;
    res.redirect('/dashboard');
  });
});

module.exports = router;
