import { Request, Responsen, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface IPayload {
	_id: string;
	iat: number;
	exp: number;
}

export const TokenValidation = (req: Request , res: Response, next: NextFunction) => {

	const token = req.headers['auth-token'];
	if(!token) return res.status(401).json("Access denied")

	try{
		const payload = jwt.verify(token, process.env.TOKEN_SECRET) as IPayload
		req.userId = payload._id;
		req.userEmail = payload.email;
	} catch(err){
		console.log(err)
	}

	
	next();
}