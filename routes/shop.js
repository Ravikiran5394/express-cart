

const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

// /product/productId(dynamic) => GET
router.get('/products/:productId',shopController.getProductDetail);

router.get('/cart',shopController.getCart);

// /cart => POST
router.post('/cart',shopController.postCart);

// /cart-delete-item => POST
router.post('/cart-delete-item',shopController.postCartDeleteProduct);

// /Orders => GET
router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckout);

module.exports = router;
