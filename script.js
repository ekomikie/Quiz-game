
const options =document.querySelector(".options").children;
const answerTrackerBox=document.querySelector(".answers-tracker");
const questionNumberSpan = document.querySelector(".question-num-value");
const totalQuestionSpan = document.querySelector(".total-questions");
const correctAnswerSpan = document.querySelector(".correct-answers");
const allQuestionsSpan = document.querySelector(".allQuestions");
const percentage = document.querySelector(".percentage");
const question = document.querySelector(".question");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let anArr = [];
let score =0;


// questions and options and answers

const questions = [
    {
        q: 'How many different heading (such as h1) elements are there ?',
        options:[4,5,6,7],
        answer:2
    },
    {
        q: 'What is an attribute ?',
        options:['An additional information about an element', 'A special HTML element for displaying attributes on a website', 'Additional information about a website','None of these'],
        answer:0
    },
    {
        q: 'What CSS property do we use to create space between elements ?',
        options:['Space', 'Margin', 'Padding','Style'],
        answer:2
    },
    {
        q: 'In JavaScript, How does a for loop start ?',
        options:['for(i=0; i <=5)', 'for(i=0; i<=5; i++)', 'for i = 1 to 5','for(i<=5; i++)'],
        answer:1
    },
    {
        q: 'How do we create a function in JavaScript?',
        options:['function = myFunction()', 'function: myFunction', 'create - myFunction()','function myFunction()'],
        answer:3
    }
]  

// set questions and options and numbers
totalQuestionSpan.innerHTML=questions.length;
function load (){
    questionNumberSpan.innerHTML=index+1
    question.innerHTML=questions[questionIndex].q;
    op1.innerHTML=questions[questionIndex].options[0];
    op2.innerHTML=questions[questionIndex].options[1];
    op3.innerHTML=questions[questionIndex].options[2];
    op4.innerHTML=questions[questionIndex].options[3];
     index++; 
}

function check(element){
    if(element.id == questions[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerChecker("correct")
        score++;
        console.log("score:"+score)
        }

    else{
        element.classList.add("wrong");
        updateAnswerChecker("wrong");
        //if the  user selected one option then disable all options
    }
     
    disabledOptions()
 
}

 
function disabledOptions(){
for(let i=0; i<options.length; i++){
    options[i].classList.add("disabled");
    if(options[i].id==questions[questionIndex].answer){
        options[i].classList.add("correct");
    }
}
}

function enableOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove("disabled","correct","wrong");
    }

}

function validate(){
    if(!options[0].classList.contains("disabled")){ // If option[0] does not have class disabled
        alert( "Please select an option")    
    }
    else{
        enableOptions();
        randomQuestion();
    }


}


function next(){
    validate();// confirms if a question has been selected 
}

function randomQuestion(){
    let randomNumber = Math.floor(Math.random()*questions.length)
    let aDuplicate=0;
    if(index==questions.length){
        endOFQuiz()
    }
    else{
       if(myArray.length>0) {
           for(let i=0; i<myArray.length; i++){
                if(myArray[i]==randomNumber){
                    aDuplicate=1;
                    break; 

                }
           }
           if(aDuplicate==1){
               randomQuestion();
           }
           else{
            questionIndex = randomNumber;
            load();
            anArr.push(questionIndex);
           }

       }
       if(myArray.length==0){
        questionIndex = randomNumber;
        load();
        anArr.push(questionIndex);
       }
    
    console.log("anArr:"+anArr);
    myArray.push(randomNumber);
    
      
    
    }   
}

function answerchecker(){
    for (let i=0; i<questions.length; i++){
        const div=document.createElement("div")
         answerTrackerBox.appendChild(div);

    }

}

function updateAnswerChecker(classNam){
 answerTrackerBox.children[index-1].classList.add(classNam)
}

function endOFQuiz(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    allQuestionsSpan.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";

} 
function tryAgain(){
    window.location.reload();
}

window.onload = function(){
 randomQuestion();
 answerchecker();
}
