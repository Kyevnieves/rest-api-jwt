import {Request, Response} from 'express'
import User, { IUser, encryptPassword, validatePassword } from '../models/User'


import jwt from 'jsonwebtoken'

import client from '../database'


const collectionUsers = client.db("DB_jwt").collection("users");

export const signup = async (req: Request, res:Response) => {

	const {username, email, password} = req.body
	const user: IUser = new User({
		username,
		email,
		password
	})

	user.password = await encryptPassword(user.password)

	try{
		const response = await collectionUsers.insertOne(user)
		console.log(response)
		res.json({
			"message": "Usuario creado exitosamente"
		})
	} catch(err){
		console.log(err: string)
	}

}


export const signin = async (req: Request, res:Response)=>{

	const {email, password} = req.body

	const user = await collectionUsers.findOne({email:email})
	if(!user) return res.status(400).json("Email o password wrong")

	const correctPassword: boolean = await validatePassword(password, user.password)
	if(!correctPassword) return res.status(400).json("Invalid password")

	const token: string = jwt.sign({_id: user._id, email: user.email}, process.env.TOKEN_SECRET, {
		expiresIn: 60 * 60 * 24
	})

	res.header('auth-token', token).json({
		user,
		token
	})

}


export const profile = async (req: Request, res:Response) => {
	const user = await collectionUsers.findOne({email:req.userEmail})
	if(!user) return res.status(404).json("User not found");
	res.json({
		_id: user._id,
		username: user.username,
		email: user.email
	});
}
