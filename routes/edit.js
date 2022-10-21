const edit = document.getElementById("edit questions");
const save = document.getElementById("btn save");
const add = document.getElementById("btn new questions");
const form = document.getElementById("originalFormQs");
edit.addEventListener("click",function(){
    form.contentEditable = true;

});

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('edit');
});

module.exports = router;