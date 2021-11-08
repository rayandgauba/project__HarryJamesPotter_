var prediction_1 = "";
var prediction_2 = "";

Webcam.set({
    width : 350 , 
    heigh : 300 , 
    image_format : 'png' ,  
    png_quality : 90
});

var camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";        
    });
}

console.log("Ml5 Version" , ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0HjfIifsH/model.json",modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}


function speak(){
    synth = window.speechSynthesis;
    speak_data1 = "The first predection is " + prediction_1;
    speak_data2 = "The second predection is " + prediction_2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}

    function check(){
        img = document.getElementById("captured_image").src;
        classifier.classify(img , gotResult);
}
    
    function gotResult(error , results){
        if (error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            document.getElementById("result_emotion_name1").innerHTML = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
            speak();

            if (results[0].label == "victory"){
                document.getElementById("update_emoji").innerHTML = "&#9996;";
            }

            if (results[0].label == "yes"){
                document.getElementById("update_emoji").innerHTML = "&#128077;";
            }

            if (results[0].label == "no"){
                document.getElementById("update_emoji").innerHTML = " &#128078;";
            }

            if (results[0].label == "amazing"){
                document.getElementById("update_emoji").innerHTML = "&#128076;";
            }

            if (results[1].label == "victroy"){
                document.getElementById("update_emoji").innerHTML = "&#9996;";
            }

            if (results[1].label == "yes"){
                document.getElementById("update_emoji").innerHTML = "&#128077;";
            }

            if (results[1].label == "no"){
                document.getElementById("update_emoji").innerHTML = " &#128078;";
            }

            if (results[1].label == "amazing"){
                document.getElementById("update_emoji").innerHTML = "&#128076;";
            }
        }
    }