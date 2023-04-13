module.exports = (req, res, next) => {
  const {
    email,
    password,
    firstname,
    lastname,
    birthdate,
    phone,
    sex,
    birthnumber,
  } = req.body;

  function validEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if (req.path === "/register") {
    if (
      ![
        email,
        password,
        firstname,
        lastname,
        birthdate,
        phone,
        sex,
        birthnumber,
      ].every(Boolean)
    ) {
      return res.status(401).json("Some required fields are not filled in");
    } else if (!validEmail(email)) {
      return res.status(401).json("Email has invalid format");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Some required fields are not filled in");
    } else if (!validEmail(email)) {
      return res.status(401).json("Email has invalid format");
    }
  }
  next();
};