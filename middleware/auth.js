const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
   try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(200).json({
                success: false,
                message: "Plase provide authorization token",
                data: null,
                error: null
            });
        }
        const decoded = jwt.verify(token, process.env.JSON_SECRET_KEY);
        if (!decoded) {
            return res.status(200).json({
                success: false,
                message: "Your session is expired. Please login again.",
                data: null,
                error: null
            });
        }
        req.userId = decoded.userId;
        next();
   } catch (error) {
       next(error);
   }
}

module.exports = auth;