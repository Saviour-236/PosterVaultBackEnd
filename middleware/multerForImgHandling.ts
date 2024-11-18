// multer config file
import multer from 'multer';

const upload = multer({ dest: './public/uploads/' })

export default upload;