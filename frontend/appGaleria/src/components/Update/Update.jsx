import axios from "axios";
import { useState } from "react";

function Update({img , setModal}){
    const [description , setDescription] = useState(img["description"]);

    const saveUpdate = (e) =>{
        e.preventDefault();
        try {
            const url = `http://localhost:3000/api/update`;
            
            const frmData = new FormData();

            frmData.append("image", e.target.image.files[0]);
            frmData.append("description", e.target.description.value);
            frmData.append("id",img["_id"]);

            axios.put(url,frmData);
            
        } catch (error) {
            console.log(error);
        }
        setModal(false);
    }
    

    return <div className="mt-[28px]">
        <form encType="multipart/form-data" onSubmit={saveUpdate} className="flex flex-col gap-[8px] items-center">
            <input 
            type="text" 
            name="description" 
            onChange={(e) => setDescription(e.target.value) } 
            value={description}
            className="p-[6px] rounded-[6px] text-white w-full"/>
            <input type="file" name="image" id="image"/>
            <button className="p-[8px]  w-[80px] text-white bg-saul rounded-[6px] hover:bg-orange-600 ease-in duration-200">Guardar</button>
        </form>
    </div>  
}

export default Update;