const jwt = require("jsonwebtoken");


const adminauth= async(req,res,next)=>{
    try{
        const {token}=req.headers
        if(!token){
            return res.status(401).send({ error: "Please authenticate" });
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        if(decodedToken!==process.env.ADMINEMAIL + process.env.ADMINPASS ){
            return res.status(401).send({ error: "Please authenticate" });
        }
        next()

    }
    catch(error){
        console.log(error)
        res.json(error.message)

    }
    


}

module.exports = {adminauth};