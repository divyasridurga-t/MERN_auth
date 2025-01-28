import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const userMidAuth = (req, res, next) => {
    let { token } = req.cookies;

    if (!token) {
        return res.json({
            status: false,
            message: 'token expired login again'
        })
    }

    try {
        let tokenDecode = jwt.verify(token, process.env.JWT_SCRET);
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id
            req.userId = tokenDecode.id
        }
        else {
            return res.json({
                status: false,
                message: 'token expired login again'
            })
        }
        next();
    } catch (error) {
        console.log(error);

        return res.json({
            status: false,
            message: error.message
        })
    }
}
export default userMidAuth