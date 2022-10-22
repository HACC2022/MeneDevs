const edit = document.getElementById('edit-question');
const save = document.getElementById('save-button');
const add = document.getElementById('new-question');
const form = document.getElementsByClassName('originalFormQs')[0];
const create = document.createElement("create");

// Gives functionality to edit button (NEED TO SOMEHOW MAKE IT MORE OBVIOUS THE USER IS ABLE TO EDIT THE QUESTIONS)
 edit.addEventListener('click', _ => {
    form.contentEditable = true;
    console.log("edit");
 });

// Gives functionality to save button
 save.addEventListener('click', _ =>{
    form.contentEditable = false;
    console.log("save");
 });

//Gives functionality to add button (WORK IN PROGRESS)
 add.addEventListener('click', _ =>{
    create.setAttribute("type", "text");
 });