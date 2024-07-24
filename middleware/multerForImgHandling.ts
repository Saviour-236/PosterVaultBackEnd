// multer config file
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/uploads'); // Temporary storage directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use original filename
    }
  });
 const upload = multer({ storage });

export default upload;