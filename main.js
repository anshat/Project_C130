song = "";

function preload() {
    song = loadSound("DangerWoman Ariana Grande.mp3");
    song1=loadSound("music.mp3");
    song2=loadSound("pinkPanther.mp3");
}
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("posenet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x =" + leftWristX + "left wrist y=" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x =" + rightWristX + "right wrist y=" + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#11fa21");
    stroke("#f50202");
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song.stop();
        song1.stop();
        if(song2_status==false){
          song2.play();
          document.getElementById("song").innerHTML="playing pink panther";
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song.stop();
        song2.stop();
        if(song1_status==false){
          song1.play();
          document.getElementById("song").innerHTML="playing harry potter";
    }
    }
}



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause() {
    song.pause();
}