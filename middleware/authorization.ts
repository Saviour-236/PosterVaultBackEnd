// middleware that authorize the routes according to the user role on behalf of their token 
import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
// middleware that authorize the routes according to the user role on behalf of their token
const authorization =  (req: Request, res: Response, next: NextFunction) => {
   //console.log('in authorization middleware');
   // console.log("cookies", req.cookies);
    // get token from cookies
    const token = req.get("authToken")
    // console.log("req.get('authToken')", req.get("authToken"));
    // console.log("this is token in authorization token ",token);
    //checking if token exist in request  cookies or not
    if (!token) {
    //   console.log('no token found in cookies');
        return res.status(401).json({ message: 'not authorized please sign in first ' });
    }

    // checking user is admin or not with decoding the token and also checking if token is valid or not
    // console.log("this is secret key for jwt token",process.env.JWT_TOKEN_SECRET_KEY);
   
    jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY as string, (err: jwt.VerifyErrors | any, decodedUser: JwtPayload | any) => {
        //handling errors in token verification
        if (err) {
            // console.log('error in token verification', err);
            if (err.name === 'TokenExpiredError') {
                // console.log('token expired');
                return res.status(401).json({name:"tokenExpired",message: 'token expired please sign in again'});
            }
                // console.log('error in token verification', err);
            return res.status(401).json({ name: err.name, message: err.message })
        };

        // checking if user is admin or not
        const { role } = decodedUser.userInfo;
        if (role !== 'admin') {
            // console.log('user is admin');
            return res.status(401).json({ message: ' only admin can access this route ' })
        }

        // console.log('decoded user', decodedUser);
        next();
        });
};

export default authorization;