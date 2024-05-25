import mongoose from "mongoose";

 const ventasSchema = new mongoose.Schema ({
    reciver : {
        type : String ,
        require : true
    },
    date : {
        type : Date,
        require : false
    },
    products : {
        type : Array,
        require : true
    },
    total : {
        type : Number,
        require : false
    }

})

ventasSchema.pre('save', async function (next) {
    const venta = this ;
    const fecha = new Date();

    try {
        venta.date = fecha;
        next();
    } catch (error) {
        console.log(error);
    }

})

export const Sells = mongoose.model("Sales", ventasSchema )

