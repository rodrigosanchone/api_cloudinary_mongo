import Product from '../models/products.model.js'
import { uploadImage, deleteImage } from '../src/cloudinary.js'
import fs from 'fs-extra'
export const controllers = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()
            res.json(products)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }

    },

    getProduct: async (req, res) => {
        console.log(req.params)


        try {
            const product = await Product.findById(req.params.id)

            if (!product) {
                return res.status(404).json({
                    message: 'Product not find'
                })
            }
            return res.json(product)


        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }


    },

    createtProducts: async (req, res) => {
        const { name, description, price } = req.body
        try {
           
            console.log(req.files)
            const product = new Product({
                name,
                description,
                price
            })

            if(req.files?.image){
             const img= req.files.image.tempFilePath
             const result = await  uploadImage(img);

             console.log(result)
             product.image={
                public_id: result.public_id,
                secure_url: result.secure_url
             }

             await fs.unlink(img)
            }
            await product.save()
            res.json(product)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }




    },




    updateProduct: async (req, res) => {
        const { id } = req.params;
        try {
        
            const product = await Product.findById(id)
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
              }
            if(req.files?.image){
                await deleteImage(product.image.public_id);
            }

            const image = req.files.image.tempFilePath;
            const result = await uploadImage(
                image,{
                    public_id: product.image.public_id,
                    invalidate: true
                }
            );
            await fs.unlinkSync(image);
            product.image = {
                public_id: result.public_id,
                secure_url: result.secure_url,
              };
              const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
                new: true,
              });
              return res.status(200).json(product);
            } catch(error){
            return res.status(500).json({ message: error.message });
        }

      

    },

    deleteProduct: async (req, res) => {

        try {
            const product = await Product.findByIdAndDelete(req.params.id)
            await deleteImage(product.image.public_id)
            return res.send(product)
            if (!product) return res.status(404).json({
                message: 'Product not find'
            })
            
           return res.json(product)
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }



    }


}






