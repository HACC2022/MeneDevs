const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {    
    res.render('admin-home');
});

module.exports = router;