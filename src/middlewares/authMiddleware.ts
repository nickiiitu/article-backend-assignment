import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IRequest extends Request{
    user?:any
}
export const authenticateJWT = (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    const secret=process.env.jwt?process.env.jwt :""
    if (token) {
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
