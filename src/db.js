import mongoose from 'mongoose'


export async function connect(){

    try{
        await mongoose.connect('*******************',{useNewUrlParser:true})
        
    }catch(error){
       console.log(error)
    }

   
}

