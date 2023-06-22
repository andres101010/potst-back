const multer = require('multer');
const path = require('path');

const diskTorage = multer.diskStorage({
    destination: path.join(__dirname, '../archivos'),
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileUpload = multer({
    storage: diskTorage
});

module.exports = {
    fileUpload
};
