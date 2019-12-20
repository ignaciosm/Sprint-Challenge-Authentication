const bcrypt = require('bcryptjs');
const router = require('express').Router();
const authModel = require('./auth-model');
const authenticate = require('./authenticate-middleware')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  authModel.create(user)
  .then(([id]) => {
    res.status(201).json(id);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  authModel.findBy({username}).first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = authModel.signToken(user);
      res.json({token: token})
    } else {
      res.status(401).json({msg: 'You shall not pass!'})
    }
  })
  .catch(err => res.status(500).json({msg: 'we have a problem'}));
});

router.get('/users', authenticate, (req, res) => {
  authModel.all()
  .then(users => {
    res.json(users)
  })
  .catch(err => res.send(err));
});

module.exports = router;
