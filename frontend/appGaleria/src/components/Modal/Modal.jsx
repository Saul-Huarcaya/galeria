


function Modal({setModal , children}){
    return <div className="fixed top-0 left-0 right-0 bottom-0 h-full bg-black bg-opacity-80 flex items-center justify-center">
        <div className="p-[16px] bg-white text-black rounded-[8px] relative min-w-[200px]:">
            <button className="hover:text-red-500 cursor-pointer text-black max-w-[250px] top-[8px] font-semibold border-none text-[24px] absolute right-[16px] flex items-center transition ease-in duration-200" onClick={()=> setModal(false)}>x</button>
            {
                children
            }
        </div>
    </div>
}

export default Modal;