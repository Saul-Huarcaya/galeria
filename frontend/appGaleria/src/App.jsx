import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Modal from './components/Modal/Modal';
import Delete from './components/Delete/Delete';
import Update from './components/Update/Update';
import FullImg from './components/FullImg/FullImg';
import { RiDeleteBin5Line  , RiPencilFill} from "react-icons/ri";
import { ImEnlarge } from "react-icons/im";

function App() {

  const [galeria , setGaleria ] = useState([]);
  const [modalDelete , setModalDelete] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalFullImg , setModalFullImg] = useState(false);
  const [dataImg , setDataImg] = useState();

  const saveGallery = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/img";
      const frmData = new FormData();

      frmData.append("image", e.target.image.files[0]);
      frmData.append("description", e.target.description.value);
      e.target.reset();
      await axios.post(url , frmData);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getImgs()
  },[galeria]);

  const getImgs = async () =>{
    try {
      const url = "http://localhost:3000/";
      const res =  await axios.get(`${url}api`)
      setGaleria(res.data);
    } catch (error) {
      console.log(error)
    }
  }
  const eliminarImg = (img) =>{
    setDataImg(img);
    setModalDelete(true);
  }

  const updateImg = (img) =>{
    setDataImg(img);
    setModalUpdate(true);
  }

  const fullImg = (img) =>{
    setDataImg(img);
    setModalFullImg(true);
  }
  return (
    <div className='flex flex-col items-center p-2'>
        <h1 className='font-sans text-3xl font-semibold'>Galeria de Imagenes</h1>
        <form
        className='mt-2 flex flex-col gap-3 max-w-md' 
        method="post" encType="multipart/form-data" onSubmit={saveGallery}>
          <input type="text" name="description" className='rounded-[5px] p-[6px] text-[18px]' />
          <input type="file" name="image" id="image" />
          <button className='btn bg-black text-[20px] p-[4px] hover:bg-green-700 rounded-[6px]'>Guardar</button>
        </form>

        <div className='grid max-w-[1080px] mt-[16px] gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' >
            {
              galeria.map(img => 
                <div key={img["_id"]} className='flex flex-col items-center justify-between bg-black rounded-[8px] overflow-hidden md:to-black'>
                  <div className='min-h-[180px] flex items-center w-full relative'>
                    <img 
                      src={`http://localhost:3000/Imagenes/${img.nameImg}`} 
                      className='h-auto sm:h-[260px] md:h-[220px] object-cover flex-1 lg:h-[200px] block w-full'
                    />
                    

                    <button className='ease-in duration-100 hover:bg-orange-500 p-1.5 absolute bottom-[6px] right-[4px] bg-black rounded-[4px] cursor-pointer text-[20px] border-2' onClick={() => updateImg(img)}>
                      <RiPencilFill />
                    </button>

                    <button className='ease-in duration-100 hover:bg-red-500 p-1.5 absolute bottom-[46px] right-[4px] bg-black rounded-[4px] cursor-pointer text-[20px] border-2' onClick={() => eliminarImg(img)}>
                      <RiDeleteBin5Line />
                    </button>

                    <button className='ease-in duration-100 hover:bg-green-700 p-1.5 absolute bottom-[86px] right-[4px] bg-black rounded-[4px] cursor-pointer text-[20px] border-2' onClick={() => fullImg(img)}>
                      <ImEnlarge />
                    </button>

                  </div>

                  <div className='flex text-center p-2 relative w-full'>
                    <p className='flex justify-center items-center text-[16px] font-semibold min-h-[50px] w-full'>{img.description}</p>
                  </div>
                </div>
              )
            }
        </div>
        
        { modalDelete && <Modal setModal={setModalDelete}>
            <Delete img={dataImg} setModal={setModalDelete} />
          </Modal>
        } 

        {
          modalUpdate && <Modal setModal={setModalUpdate} >
            <Update img={dataImg} setModal={setModalUpdate} />
          </Modal>
        }

        {
          modalFullImg && <Modal setModal={setModalFullImg}>
            <FullImg img={dataImg} />
          </Modal>
        }
    </div>
  )
}

export default App
