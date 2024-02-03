import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'xxxxxxxxx', 
    api_key: 'xxxxxxxxxx', 
    api_secret: 'xxxxxxxxxxxx',
     secure:true 
  });

export const  uploadImage = async(filepath)=>{
  return await cloudinary.uploader.upload(filepath,{
    folder: 'Prueba1'
  })


} ;

export const deleteImage = async(public_id)=>{
 return  await cloudinary.uploader.destroy(public_id)
} 
