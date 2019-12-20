const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {

//   res.status(401).json({ you: 'shall not pass!' });
// };

module.exports = (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    const secret = process.env.JWT_SECRET || "senorita potatito del peru";

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decoded;

        next();
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
}