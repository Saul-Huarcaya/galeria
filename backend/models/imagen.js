const mongoose = require("mongoose");

const Imagen = new mongoose.Schema({
    description:{ type: String, required:true},
    nameImg:{type:String, required:true}
},{
    collection:"Imagen"
})

module.exports = mongoose.model("Imagen",Imagen);