var start = false
var currentIndex = 0; // To track the current question index
var currentQuestionSet = 0; // To track the current question set
var totalProgress = 0;
var questionSets = [
    {
        title: "Personal details",
        questions: [
            { 
                displayText: "Name: ", 
                question: "First name:",
                type: "text" 
            },
            { 
                displayText: "Surname: ", 
                question: "Last name:",
                type: "text" 
            },
            { 
                displayText: "Age: ", 
                question: "Age:",
                type: "number" 
            },
            { 
                displayText: "Gender: ", 
                question: "Gender(Male/Female):",
                type: "text" 
            },
            { 
                displayText: "Privacy Agreement: ", 
                question: "Agree with privacy terms:",
                type: "checkbox" 
            }
        ]
    },
    {
        title: "Volunteering tasks",
        questions: [
            { 
                displayText: "Interest in Volunteering: ", 
                question: "Why are you interested in volunteering?" 
            },
            { 
                displayText: "Relevant Skills: ", 
                question: "Your relevant skills:" 
            },
            { 
                displayText: "Main Volunteering Goal: ", 
                question: "Your main goal in volunteering:" 
            }
        ]
    },
    {
        title: "Qualifications",
        questions: [
            {
                displayText: "Area of Study: ",
                question: "Please specify the field or discipline you studied."
            },
            {
                displayText: "Highest Degree Obtained: ",
                question: "What is the highest academic degree you have achieved?"
            },
            {
                displayText: "University/Institution: ",
                question: "Which university or educational institution did you attend for this qualification?"
            },
            {
                displayText: "Year of Completion: ",
                question: "In which year did you complete your studies?",
                type: "number"
            },
            {
                displayText: "Country: ",
                question: "In which country did you pursue your education?"
            }
        ]
    },
    {
        title: "Availablity and Contact",
        questions: [
            { 
                displayText: "Min Hours per Week: ", 
                question: "Please specify the minimum number of hours you can commit to per week:"
            },
            { 
                displayText: "Tel. Number: ", 
                question: "Please provide your telephone number:",
                type: "tel" 
            },
            { 
                displayText: "Email: ", 
                question: "Please provide your email address:",
                type: "email" 
            }
    ]
    }
];
var answers = []; // Object to store answers

function showPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('prompt').style.display = 'block';
    next() 
}

function hidePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('prompt').style.display = 'none';
}

function skip() {
    // Handle skip button action
    if (currentQuestionSet <= questionSets.length - 1) {
        currentIndex = 0;
        currentQuestionSet++;
        document.getElementById('answer').value = ""; // Clear input field
        next();
    } else {
        currentIndex = 0; 
        currentQuestionSet = 0; 
        hidePopup();
    }
}

function next() {
    // Handle next button action
    if (currentIndex == 0 & !start){
        console.log("skipping 1st run2")
        start = true
    }else{
        currentQuestion = questionSets[answer_set].questions[answer_question]
        // console.log(currentQuestion.question+" "+document.getElementById('answer').value)
        var answer = document.getElementById('answer').value;
        // currentQuestion.answer = answer;
        if (answer != ""){
            var answer = document.getElementById('answer').value;
            currentQuestion.answer = answer;
            updateAnswersTable(answer_set, answer_question, answer)
            updateProgressBar(answer_set)
        }
    }

    if (currentQuestionSet > questionSets.length - 1){
        currentIndex = 0; // To track the current question index
        currentQuestionSet = 0; // To track the current question set
        answer_set = 0;
        answer_question = 0;
        start = false
        hidePopup();
        return
    }
    for (let rowIndex = 0; rowIndex < questionSets.length; rowIndex++) {
        const item = questionSets[rowIndex];
        if (rowIndex >= currentQuestionSet) {
            for (let qnumber = 0; qnumber < item.questions.length; qnumber++) {
                const question = item.questions[qnumber];
                console.log(rowIndex ,currentQuestionSet, currentIndex , qnumber , currentIndex < qnumber & !questionSets[rowIndex].questions[qnumber].answer)
                if (currentIndex <= qnumber & !questionSets[rowIndex].questions[qnumber].answer) {
                    currentQuestionSet = rowIndex;
                    currentIndex = qnumber;
                    answer_set = currentQuestionSet;
                    answer_question = currentIndex;
                    
                    document.getElementById('question_Title').innerText = "Step " + (currentQuestionSet + 1) + " " + questionSets[currentQuestionSet].title + " | " + (currentIndex + 1) + "/" + questionSets[currentQuestionSet].questions.length;
                    document.getElementById('question_Text').innerText = questionSets[currentQuestionSet].questions[currentIndex].question;
                    document.getElementById('answer').value = ""; // Clear input field
                    
                    var type = questionSets[currentQuestionSet].questions[currentIndex].type
                    if (type == 'checkbox'){
                        document.getElementById("answer").setAttribute('type', "checkbox")
                    } else if(type!== null) {
                        document.getElementById("answer").setAttribute('type', type)
                    } else{
                        document.getElementById("answer").setAttribute('type', "text")
                    }
                        
                    currentIndex++;
                    console.log(currentQuestionSet, currentIndex)
                    console.log(currentIndex >= questionSets[currentQuestionSet].questions.length - 1)
                    // console.log(currentIndex, questionSets[currentQuestionSet].questions.length - 1 , currentIndex >= questionSets[currentQuestionSet].questions.length - 1)
                    if (currentIndex > questionSets[currentQuestionSet].questions.length - 1) {   
                        currentQuestionSet++;
                        currentIndex = 0;
                    } 
                    return; // exit the loop
                }
            }
        }
    }    
}

function close_prompt() {
    currentIndex = 0; 
    currentQuestionSet = 0; 
    hidePopup();
}

function updateProgressBar(answer_set) {
    //
    totalProgress = Math.round(totalProgress + (100/(questionSets.length*questionSets[answer_set].questions.length)))
    if (totalProgress >= 96){
        document.getElementById('answer').value = ""; // Clear input field
        document.getElementById('progressText').innerText = "Profile Completed 100 %";
        document.getElementById("progressBar").style.width = "100%";
        document.getElementById("btn_start").style.display = 'none';
        document.getElementById("btn_submit").style.display = 'block';
        hidePopup();
        currentQuestionSet = 10
        currentIndex = 10
    }else{
        console.log(totalProgress)
        document.getElementById('progressText').innerText = "Profile Completed " + totalProgress + "%";
        document.getElementById("progressBar").style.width = totalProgress + "%";
    }
    
}


function updateAnswersTable(rowIndex, qnumber, answer) {
    //display answer
    if (rowIndex != 0){
        var row_top = document.getElementById("row."+rowIndex +".top");
        row_top.style.display = "";
    }
    var row = document.getElementById("row."+rowIndex +"."+ qnumber);
    var cell = document.getElementById("cell."+rowIndex +"."+ qnumber);
    cell.innerHTML = questionSets[rowIndex].questions[qnumber].displayText +" "+ answer;
    row.style.display = "";
}

//change checkbox value on to yes
var valueDisplay = document.getElementById("answer");
valueDisplay.addEventListener('change', function() {
    var valueDisplay = document.getElementById("answer");
    if (valueDisplay.type == "checkbox"){
        var isChecked = this.checked;
        valueDisplay.value = isChecked ? "Yes" : "No";
        return console.log("Checkbox with ID '" + this.id + "' is now " + (isChecked ? "checked" : "unchecked"));
    }
        
});

// Get a table element
var table = document.getElementById('answersTableBody');
// Create table rows
questionSets.forEach(function(item, rowIndex) {
    item.questions.forEach(function(question, qnumber){
        if (qnumber==0 & rowIndex != 0) {
            var row_top = table.insertRow();
            row_top.classList.add("green-bottom");
            row_top.setAttribute("id", "row."+rowIndex +".top"); // Assigning ID to row
            row_top.style.display = "none";
        }
        var row = table.insertRow();

        row.setAttribute("id", "row."+rowIndex +"."+ qnumber); 
        var cell = row.insertCell(0);
        cell.setAttribute("id", "cell."+rowIndex +"."+ qnumber)
        row.style.display = "none";
    })
});

