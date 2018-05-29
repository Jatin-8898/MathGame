//this will be executed once wen page loaded
var playing = false;
var score;

var timeremaining;
var correctAnswer;

//this code will be excuted wenevr u click the btn
document.getElementById("start-reset").onclick = function(){
    //code to be executed wen start-reset bt is clicked
    
    //checking whether we r playin or not
    if(playing==true){              //we r playing
        
        location.reload();      //refresh or reload the page
    }
    else{                  //we r not playing
        
        playing = true;
        score = 0;              //initially score will be 0
        document.getElementById("scoreValue").innerHTML = score;
        
        hide("game-over");
        
        show("timeremaining");
        timeremaining =60;//we r maniplualting everything with js
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;//for dynamic chaning
        
        startCountdown();
        
        //chnaging the text of btn
        document.getElementById("start-reset").innerHTML="Reset Game"    
        generateQA();
    }
}
function startCountdown(){
    var action = setInterval(function(){
        timeremaining -= 1;      //auto decrement by 1 ie  60,59,58
        
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){                 //game over
            clearInterval(action);              //clear kiya taki 0 tak hi jaa otherwise it will go in minus  -1,-2
            
            document.getElementById("game-over").innerHTML ="<p>GAME OVER!</p><p>Your Score is " + score +".</p>"; //game-over screen
            
            show("game-over");
            hide("timeremaining");  
            document.getElementById("start-reset").innerHTML="Start Game"       //again set the text on the btn       
            
            playing = false;
        }
    },1000);
}

//handling evnets for ans boxes
for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick =function(){
    
    if (playing=true){
        
        if(this.innerHTML == correctAnswer){
            //correct answer hai toh score increment karo
            score++;                       
            document.getElementById("scoreValue").innerHTML = score;
            
            hide("wrong");          //wrong hide karo
            show("correct");
            setTimeout(function(){          //correct display karo lekin sirf 1 sec ke liye disp karo
                hide("correct");
            },1000);
            
            
            //geneate QA
            generateQA();
        }else{
            //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);
            
        }
    }
  }
}

function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x + y;
//    document.getElementById("question").innerHTML = x +"*"+ y;//this is multiply
    document.getElementById("question").innerHTML = x +"+"+ y;//this is add
    
    var correctPosition = 1 + (Math.round(3*Math.random()));  //we generate the right ans 
    
    //below code fils the corret ans into random box
    document.getElementById("box"+correctPosition).innerHTML= correctAnswer;  //one box of right  ans
    
    
    var answers = [correctAnswer];//this is array of correct ans
    
    for(i=1; i<5; i++){
        
        if(i!=correctPosition){                     //for 3 wrong positons
            
            var wrongAnswer;                        //local var
            
            do{
                
                wrongAnswer =(1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));                
                
            }while(answers.indexOf(wrongAnswer) > -1)
            
            answers.push(wrongAnswer);                  //is a method to put the wrongAnswer in array
            document.getElementById("box"+i).innerHTML =wrongAnswer;
        }   
    }
}
//for showing and hiding the wrong and the correct divs
function show(Id){
    document.getElementById(Id).style.display ="block";
}
function hide(Id){
    document.getElementById(Id).style.display ="none";
}
        