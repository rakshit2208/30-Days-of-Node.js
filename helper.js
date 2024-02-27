const jwt = require("jsonwebtoken");


const users = [
  { id: 1, username: "admin", role: "admin" },
  { id: 2, username: "user", role: "regular" },
];


// Secret key for JWT signing
const secretKey = "your_secret_key";

function authenticateAndAuthorize(req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token is required" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Check if the decoded token contains a valid user
    const user = users.find((u) => u.username === decoded.username);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Check if user has the required role
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    // Attach the user object to the request for further processing
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = authenticateAndAuthorize;
