// middleware that authorize the routes according to the user role on behalf of their token 
import type { Request, Response, NextFunction } from 'express';
import jwt, {  type JwtPayload } from 'jsonwebtoken';
const SECRET_KEY = process.env.AUTH_TOKEN_SECRET_KEY as string;
// middleware that authorize the routes according to the user role on behalf of their token
const authorization = (req: Request, res: Response, next: NextFunction) => {
    // get token from cookies
    const token = req.cookies.authtoken;

    //checking if token exist in request  cookies or not
    if (!token) {
        return res.status(401).json({message:'not authorized please sign in first '});
    }

    // checking user is admin or not with decoding the token and also checking if token is valid or not
    jwt.verify(token, SECRET_KEY,(err: jwt.VerifyErrors | any, decodedUser: JwtPayload | any ) => {
        if (err) {
            return res.status(401).clearCookie(req.cookies.authtoken).json({ name: err.name, message: err.message })
        }
        const { admin } = decodedUser.user;
        if (!admin) {
            return res.status(401).json({ message: ' only admin can access this route ' })
        }
        next();
    })

}

export default authorization;