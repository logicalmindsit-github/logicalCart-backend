import 'dotenv/config'
import jwt from "jsonwebtoken";


const secret = process.env.SECRET;
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const newToken = token.split(" ")[1];
        try {
            const decode = jwt.verify(newToken, secret);
           
            req.body.userId = decode.id;
            next();
        } catch (error) {
            res.send("Invalid token");
        }
    } else {
        res.send("No token found, please login");
    }
};

export default auth;
