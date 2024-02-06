import  express  from "express";
import fileUpload from  'express-fileupload';
import morgan from "morgan";
import cors from 'cors'
import indexRouter  from "../routes/index.js"
import productsRouter  from "../routes/products.js"
/*-comentario*/
const app= express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: './uploads'
}))
app.use(morgan('dev'))

app.use(indexRouter)
app.use(productsRouter)

export default app;