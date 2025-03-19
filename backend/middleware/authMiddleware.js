const jwt = require("jsonwebtoken");

const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).send({ error: "Please authenticate" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Data:", data);
        
        req.user = data.user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(400).send({ error: "Invalid token" });
    }
};


module.exports = {fetchUser};
