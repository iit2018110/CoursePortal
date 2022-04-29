const express = require('express');
const router = express.Router();
const authMiddleware = require('../../../middlewares/auth');


const Basket  = require('../../../controllers/admin/elective/basket');

router.get('/fetch_it_baskets', authMiddleware.authValidator, Basket.fetch_it_baskets);
router.get('/fetch_ece_baskets', authMiddleware.authValidator, Basket.fetch_ece_baskets);

router.get('/fetch_it_faculties', authMiddleware.authValidator, Basket.fetch_it_faculties);
router.get('/fetch_ece_faculties', authMiddleware.authValidator, Basket.fetch_ece_faculties);

router.post('/create_basket', authMiddleware.authValidator, Basket.create_basket);
router.post('/add_course', authMiddleware.authValidator, Basket.add_course);
router.delete('/delete_course', authMiddleware.authValidator, Basket.delete_course);
router.delete('/delete_basket', authMiddleware.authValidator, Basket.delete_basket);

module.exports = router;