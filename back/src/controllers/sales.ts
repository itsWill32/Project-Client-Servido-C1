import { Sells } from "../models/venta.js";
import { User } from "../models/user.js";
import express from 'express'

export const venta = async (req:express.Request , res: express.Response ) =>{

    try {
        const{reciver,products} = req.body;

        console.log(reciver,products);

        const Usr = await User.findById(reciver);

        const Venta = new Sells({reciver,products});

        await Venta.save();
        
        return res.json({ok : true})

    } catch (error) {
        console.log(error)
        return res.status(500).json({erro:"Server Error"});
    }
}


export const getVentas = async (req:express.Request , res: express.Response ) =>{
    try {
        const ventas = await Sells.find();

        return res.json({ventas});

    } catch (error) {
        console.log(error);
        return res.status(500).json({erro:"Server Error"});
    }
}
