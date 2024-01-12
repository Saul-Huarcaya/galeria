const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Imagen = require("../models/imagen");

const storage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null, 'public/Imagenes');
    }, 

    filename: (req , file , cb) =>{
        const filename = file.originalname;
        cb(null, filename);
    }
});

const upload = multer({storage : storage});

//INSERTAR FOTO
router.post("/img", upload.single('image') , async (req , res)=>{
    
    try {
        if(req.file){
            const resultado =  await Imagen.create({
                description: req.body.description,
                nameImg: req.file.filename
            }) 

            console.log(resultado);   
        }else{
            return
        }
    } catch (error) {
        console.log(error)
    }
    
});


//TODAS LAS FOTOS
router.get("/", async (req , res) => {
    try {
        const resultado = await Imagen.find();
        res.json(resultado)
    } catch (error) {
        console.log(error)
    }
});

//ACTUALIZAR

router.put("/update", upload.single('image') , async(req , res) => {
    let description = req.body.description;
    let nameImg = (req.file)? req.file.filename:null;
    let id = req.body.id;
    try {
        if(nameImg === null){
            await Imagen.findOneAndUpdate({ _id:id } , { description : description} , { new:true})
        }else{
            const imgAfter = await Imagen.findById(id);

            if(fs.existsSync(`./public/Imagenes/${imgAfter.nameImg}`)){
                fs.unlinkSync(`./public/Imagenes/${imgAfter.nameImg}`)
            }
            
            await Imagen.findOneAndUpdate({ _id:id} , {description : description , nameImg : req.file.filename } , { new:true })
            
        }
    } catch (error) {
        console.log(error);
    }
});


//ELIMINAR
router.delete("/delete/:id" , async(req , res) => {
    
    const id = req.params.id;
    const nameImg = req.body.nameImg;
    
    try {
        if(nameImg.length > 0 && id.length > 0){
            fs.unlinkSync(`./public/Imagenes/${nameImg}`);
            await Imagen.findByIdAndDelete(id);
            res.json("Se elimino con exito");
        }   
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;