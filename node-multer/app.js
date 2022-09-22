

import express from 'express'
import ejs from 'ejs'
import multer from 'multer'
import path from 'path'

const app = express()
const port = 3000

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (request, file, callback) => callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
})

const limits = { fileSize: 1024 * 50 }
const fileFilter = (request, file, callback) => {
    if (/\/(?:jpeg|jpg|png|gif|bmp|tiff|webp)/i.test(file.mimetype)) callback(null, true)
    else callback({ code: 'NOT_ALLOWED_FORMAT', message: 'Only .jpeg .jpg .png .gif .bmp .tiff .webp'})
}

const diskStorageUploader = multer({ fileFilter, limits, storage }).array('imagefile') //.single('imagefile')

app.set('view engine', 'ejs')

app.use(express.static('./public'))

app.get('/', (request, response) => response.render('index'))

app.post('/upload', (request, response) => {
    diskStorageUploader(request, response, error => {
        if (error) {
            //NOT_ALLOWED_FORMAT
            //LIMIT_PART_COUNT: Too many parts
            //LIMIT_FILE_SIZE: File too large
            //LIMIT_FILE_COUNT: Too many files
            //LIMIT_FIELD_KEY: Field name too long
            //LIMIT_FIELD_VALUE: Field value too long
            //LIMIT_FIELD_COUNT: Too many fields
            //LIMIT_UNEXPECTED_FILE: Unexpected field
            response.render('index', { msg: { error: error.code, message: error.message } })
        }
        else {
            if (request.files.length == 0) {
                response.render('index', { msg: { error: 'NO_FILES_SELECTED', message: 'No selected files' } })
            }
            else response.send(request.files)
        }
    })
})

app.listen(port, () => console.log(`Initialized at localhost:${port}`))