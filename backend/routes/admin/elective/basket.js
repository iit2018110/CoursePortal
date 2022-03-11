const express = require('express');
const router = express.Router();

const Basket  = require('../../../controllers/admin/elective/basket');

router.get('/fetch_it_baskets', Basket.fetch_it_baskets);
router.get('/fetch_ece_baskets', Basket.fetch_ece_baskets);
router.post('/create_basket', Basket.create_basket);
router.post('/add_course', Basket.add_course);
router.delete('/delete_course', Basket.delete_course);
router.delete('/delete_basket', Basket.delete_basket);

module.exports = router;