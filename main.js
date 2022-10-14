img="";
object=[];
status="";
function preload(){
    alarm=loadSound("alarm_sk8.mp3");
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(video,0,0,380,380);
    if(status !=""){
        objectdetector.detect(video,gotresult);
        for(i=0; i < object.length; i++ ){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            
            fill("red");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+ percent+"%" ,object[i].x, object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width,object[i].height);
            if(object[i].label=="person"){
                document.getElementById("Baby").innerHTML="Baby found";
                alarm.stop();
            }
            else{
                document.getElementById("Baby").innerHTML="Baby not found";
                alarm.play();
            }
        }
    if(object.length==0){
        document.getElementById("Baby").innerHTML="Baby not found";
        alarm.play();
    }
}
}

function modelloaded(){
    console.log("model is loaded");
    status=true;
}
function gotresult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;

}