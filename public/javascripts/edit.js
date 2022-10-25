const edit = document.getElementById('edit-question');
const save = document.getElementById('save-button');
const add = document.getElementById('new-question');
const form = document.getElementsByClassName('originalFormQs')[0];
const create = document.createElement("create");
var counter = 11; 
var newInput = document.createElement('input')
var newHeader = document.createElement('h3')
var testBool = true;

// Gives functionality to edit button (NEED TO SOMEHOW MAKE IT MORE OBVIOUS THE USER IS ABLE 
//TO EDIT THE QUESTIONS)
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

if(testBool == true){
add.addEventListener('click', _ =>{
   //create.setAttribute("type", "text");
   form.appendChild(newHeader);
   newHeader.innerHTML = counter+1;
   form.appendChild(newInput);
   newInput.type = 'text';
   //newInput.name = '';
   counter++;
   console.log("new question created")
 });
 testBool = false;
}