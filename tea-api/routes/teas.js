const express = require('express');
const router = express.Router();

const tea_controller = require('../controllers/teaController');

router.get('/', tea_controller.index);

router.get('/create', tea_controller.tea_create_get);

router.post('/create', tea_controller.tea_create_post);

router.get('/:id/delete', tea_controller.tea_delete_get);

router.post('/:id/delete', tea_controller.tea_delete_post);

router.get('/:id/update', tea_controller.tea_update_get);

router.post('/:id/update', tea_controller.tea_update_post);

router.get('/:id/recommend', tea_controller.tea_recommend_get);

router.post('/:id/recommend', tea_controller.tea_recommend_post);

router.get('/:id/save', tea_controller.tea_save_get);

router.get('/:id/favorite', tea_controller.tea_favorite_get);

router.get('/:id/deleterecommendation', tea_controller.tea_recommend_delete);

router.get('/:id/deletesaved', tea_controller.tea_saved_delete);

router.get('/:id/deletefavorite', tea_controller.tea_favorite_delete);

router.get('/tealist', tea_controller.tea_list);

router.get('/:id', tea_controller.tea_info);

module.exports = router;