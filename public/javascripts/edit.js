const edit = document.getElementById('edit-question');
const save = document.getElementById('save-button');
const add = document.getElementById('new-question');
const form = document.getElementsByClassName('originalFormQs')[0];
const create = document.createElement("create");
var counter = 11; 
var maxQuestions = 100;
const newHeader = document.createElement('h3');
const editPopUp = document.getElementById('popUp');
// Gives functionality to edit button
 edit.addEventListener('click', _ => {
    form.contentEditable = true;
    console.log("edit");
    editPopUp.innerHTML = "The form is now editable, press on the questions to edit!";
 });

// Gives functionality to save button
 save.addEventListener('click', _ =>{
    form.contentEditable = false;
    console.log("save");
    editPopUp.innerHTML = "New form was saved!";
 });
//Gives functionality to add button
add.addEventListener('click', _ =>{
   if (counter < maxQuestions){
      var tempHead = document.createElement('h3');
      form.appendChild(tempHead);
      tempHead.innerHTML = counter + 1 + ".";
      counter++;
   }
 });
