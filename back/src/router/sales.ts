import { venta } from "../controllers/sales";
import { getVentas } from "../controllers/sales";
import express from 'express';


export default (router: express.Router) =>{
    router.post('/venta', venta);
    router.get('/ventasData', getVentas)
};