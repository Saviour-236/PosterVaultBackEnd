// multer config file
import multer from 'multer';
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       console.log('in multer destination');
//       cb(null, '../public/uploads/'); // Temporary storage directory
//     },
//     filename: function (req, file, cb) {
//       console.log('file name starting here');
//       console.log(file);
//       console.log(file.originalname);
//       cb(null, file.originalname); // Use original filename
// console.log('file name ending here');
//     }
//   });
//  const upload = multer({ storage });
const upload = multer({ dest: './public/data/uploads/' })

export default upload;