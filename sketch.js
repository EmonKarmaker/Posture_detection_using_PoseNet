let capture;
let posenet;
let singlePose, skeleton;
let actor_img;



function setup() {
  createCanvas(800, 600);
  capture = createCapture(VIDEO);
  capture.size(800, 600);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on('pose', receivedPoses);
  actor_img= loadImage('images/q.png');
}

function modelLoaded() {
  console.log('PoseNet model loaded');
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose; // full pose
    skeleton = poses[0].skeleton; // skeleton pairs
  }
}

function draw() {
  image(capture, 0, 0, width, height);

  if (singlePose) {
    // --- Draw skeleton first ---
    stroke(0, 255, 0); // green lines
    strokeWeight(3);
    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x, skeleton[j][0].position.y,
        skeleton[j][1].position.x, skeleton[j][1].position.y
      );
    }

    // --- Draw keypoints ---
    noStroke();
    fill(255, 0, 0);
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      let { x, y } = singlePose.keypoints[i].position;
      ellipse(x, y, 15);
    }

    // --- Draw labels ---
    fill(255); // white text
    textSize(12);
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      let { x, y } = singlePose.keypoints[i].position;
      text(singlePose.keypoints[i].part, x + 10, y);
    }


      let leftEye = singlePose.keypoints.find(k => k.part === 'leftEye').position;
      let rightEye = singlePose.keypoints.find(k => k.part === 'rightEye').position;

// Midpoint coordinates
      let midX = (leftEye.x + rightEye.x) / 2;
      let midY = (leftEye.y + rightEye.y) / 2;
      image(actor_img, midX - 50, midY - 50, 100, 100);

  }
}



    //r= getRandomArbitrary(0,255);
    //g= getRandomArbitrary(0,255);
    //b=getRandomArbitrary(0,255);
    //background(200);
    //point(200,200);
    //line(200,200,300,300);
    //triangle(100, 200, 300, 400, 150, 450);
    //rect(500, 200, 100);
    //fill(132,100,34, 100);
    //stroke(255,0,0);
    //ellipse(100, 200, 100, 100);
    //strokeWeight(5);
    //stroke(0, 255, 0);
    //ellipse(250, 200, 100, 100);
    //ellipse(400, 200, 100, 100);
    //ellipse(550, 200, 100, 100);
    //ellipse(700, 200, 100, 100);

    //fill(r,g,b);
    //ellipse(mouseX, mouseY, 50, 50)

