// middleware that authorize the routes according to the user role on behalf of their token 
import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
const SECRET_KEY = process.env.AUTH_TOKEN_SECRET_KEY as string;
// middleware that authorize the routes according to the user role on behalf of their token
const authorization = (req: Request, res: Response, next: NextFunction) => {
   // console.log('in authorization middleware');
   // console.log("cookies", req.cookies);
    // get token from cookies
    const token = req.cookies.authtoken;
  //  console.log("this is token", token)
    //checking if token exist in request  cookies or not
    if (!token) {
    //   console.log('no token found in cookies');
        return res.status(401).json({ message: 'not authorized please sign in first ' });
    }

    // checking user is admin or not with decoding the token and also checking if token is valid or not
    jwt.verify(token, SECRET_KEY, (err: jwt.VerifyErrors | any, decodedUser: JwtPayload | any) => {
        if (err) {
            return res.status(401).clearCookie(req.cookies.authtoken).json({ name: err.name, message: err.message })
        }
        const { admin } = decodedUser.user;
     //   console.log('this is admin', admin);
        if (!admin) {
            return res.status(401).json({ message: ' only admin can access this route ' })
        }
        })
  //  console.log('user is admin just before next');

    next();
}

export default authorization;