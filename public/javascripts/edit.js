const edit = document.getElementById('edit-question');
const save = document.getElementById('save-button');
const add = document.getElementById('new-question');
const form = document.getElementsByClassName('.originalFormQs')[0];
const create = document.createElement("create");

// amount of questions in form
const questionLength = document.querySelectorAll('.q').length;
console.log(questionLength);
const lastQuestion = Array.from(document.querySelectorAll('.q')).pop();
console.log(lastQuestion.textContent);
var counter = parseInt(lastQuestion.textContent.substring(0, lastQuestion.textContent.indexOf("."))); 
console.log(counter);
var maxQuestions = 100;

const newHeader = document.createElement('h3');
const editPopUp = document.getElementById('popUp');

// Gives functionality to edit button (NEED TO SOMEHOW MAKE IT MORE OBVIOUS THE USER IS ABLE 
//TO EDIT THE QUESTIONS)
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

//Gives functionality to add button (WORK IN PROGRESS)
add.addEventListener('click', _ =>{
   if (counter < maxQuestions){
      var tempHead = document.createElement('h3');
      form.appendChild(tempHead);
      tempHead.innerHTML = counter + 1 + ".";
      counter++;
   }
 });
