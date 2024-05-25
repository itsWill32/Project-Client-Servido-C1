import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers/index';


//controller del register
export const register = async (req: express.Request, res: express.Response) =>{
    try{
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.sendStatus(400)
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),

            },
        });

        return res.status(200).json(user).end();
    }catch(error){
        console.error(error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    } else {
        return res.sendStatus(500);
    }
}}


//controller del login
export const login = async (req: express.Request, res: express.Response)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.sendStatus(400);
        }

        //para comporbar si hay un usuario con ese email
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password'); //el .select es importante si no no podremos acceder a la autenticacion 
        if(!user){
            return res.sendStatus(400);
        }

        //autenticamos el usuario sin conocer su contraseña
        const expectedHash = authentication(user.authentication.salt, password);
        if(user.authentication.password != expectedHash){
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('PROJECT-AUTH', user.authentication.sessionToken, {domain : 'localhost', path: '/'});
        return res.status(200).json(user).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400)
    }
}