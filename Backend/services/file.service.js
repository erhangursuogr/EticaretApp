const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // dosyanın nereye kaydedileceğini belirtir
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) { // dosyanın ismini belirtir
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => { // dosya filtreleme
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true); // kabul et
    }
    else {
        cb(null, false); // kabul etme
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;