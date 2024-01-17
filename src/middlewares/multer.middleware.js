import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      const timestamp = Date.now();
      const len = file.originalname.split(".").length;
      const fileName = file.originalname.split(".")[len - 2] + "-" + timestamp + "." + file.originalname.split(".")[len - 1];
      cb(null, fileName);
    }
})
  
export const upload = multer({ 
    storage, 
})