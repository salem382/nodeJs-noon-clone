import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { AppError } from '../utls/ApiErrors';

export const validation_object = {
  image:['image/jpeg', 'image/png'],
  files:['application/pdf']
}


export const fileUpload = (customValidation:string[], path:string) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `uploads/${path}`)
        },
        filename: function (req, file, cb) {
          cb(null,uuidv4() + file.originalname)
        }
      })

      function fileFilter (req:any, file:any, cb:any) {

        if (customValidation.includes(file.mimetype))
          return  cb(null, true)
        cb(new AppError('invalid extension', 400), false);
        
      }
      
      const upload = multer({ storage: storage, fileFilter})
      return upload;
}