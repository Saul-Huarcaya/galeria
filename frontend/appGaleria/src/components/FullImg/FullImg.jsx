function FullImg({img}){
    return <div>
        <img src={`http://localhost:3000/Imagenes/${img.nameImg}`} 
            className='h-auto sm:h-[260px] md:h-[280px] object-cover lg:h-[460px] block w-full mt-8'
        />
    </div>
}

export default FullImg;