// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   const { token } = req.headers;
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorised Login Again" });
//   }
//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export default authMiddleware;

// //THIS MIDDLEWARE BASICALLY TAKE THE TOKEN AND CONVERT IT INTO USER ID AND USING THIS USERID WE CAN ADD,REMOVE AND GET THE DATA FROM THE CART
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorised Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure req.body exists
    if (!req.body) req.body = {};

    // Add userId to req.body
    req.body.userId = token_decode.id;

    // Debug log
    console.log("✅ Authenticated userId:", req.body.userId);

    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;

