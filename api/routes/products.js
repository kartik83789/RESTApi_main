const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check_auth');
const productController = require('../controllers/productsController');

const multer = require('multer');
//multer config
// set storage location, filename format
const storage = multer.diskStorage({
    destination: function (req, resp, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, resp ,cb) {
        const productName = req.body.name;
        const originalExtension = file.originalName.split('.').pop();
        const newFileName = `${productName}.${originalExtension}`;
        cb(null, newFileName);
    }
});
// set filter for files
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image\\jpg'|| file.mimetype === 'image/png'){
        cb(null ,true);
    }else{
        cb(null ,false);
    }
}
// set config settings to multer middleware
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});
// multer config fin


// route request to correct controller
router.get('/', productController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), productController.products_create_product);

router.get('/:productId', productController.products_get_product);

router.patch('/:id', checkAuth, productController.products_update_product);

router.delete('/:productId', checkAuth, productController.products_delete_product);

module.exports = router;