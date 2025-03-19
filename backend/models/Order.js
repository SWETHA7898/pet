const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "Order is placed" },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}
});


module.exports =  mongoose.models.Order||mongoose.model("Order", OrderSchema);
