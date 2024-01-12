import axios from "axios";

function Delete({img , setModal}){
    const eliminar = (imagen) =>{
        try {
            const url = `http://localhost:3000/api/delete/${imagen["_id"]}`;
            const body =  { nameImg : imagen.nameImg };
            axios.delete(url, { data : body});
            setModal(false);
            console.log("Eliminado con exito");
        } catch (error) {
            console.log(error);
        }
    }

    return <div className="min-w-[180px] w-[250px]">
        <p className="mt-[20px]  text-center">Estas seguro de eliminar la imagen con el nombre de "{img["description"]}"</p>
        <div className="p-[1rem] flex justify-center gap-[16px]">

            <button onClick={() => eliminar(img)}
            className="bg-black text-white p-[8px] rounded-[8px] border-[4px] border-black-600 w-[60px] hover:bg-red-700 transition ease-in duration-200">si</button>

            <button onClick={() =>  setModal(false)}
            className="bg-black w-[60px] text-white p-[8px] rounded-[8px] border-[4px] border-black-600 hover:bg-green-700 transition ease-in duration-200">no</button>

        </div>
    </div>
}

export default Delete;