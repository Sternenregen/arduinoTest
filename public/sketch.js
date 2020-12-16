// use Chrome Browser
// enable the 'experimental-web-platform-features' flag opening 'chrome://flags'
// serial magic happens here > "libraries/webserial.js" 
// good documentation web serial API: https://web.dev/serial/


let connectButton;
let serialController;

function setup() {
  socket = io.connect();
  socket.on('arduino', printMsg);

  // canvas
  canvas = createCanvas(640, 480).parent('canvas');

  // init serial connection with baudrate
  serialController = new SerialController(57600);

  // init gui
  connectButton = createButton("Initialize Serial Connection");
  connectButton.class("button");
  connectButton.mousePressed(initSerial);
}

function draw() {
  // background
  background(0);
  textAlign(CENTER, CENTER);
  // just if serial controller ready an there is data
  if (serialController.read() > 0 && serialController.hasData()) {
    console.log(serialController.read());
    background(255,0,255);
    sendData();
  }

}

function sendData() {
  data = {msg: true}
  socket.emit('arduino', data);
  print("sending");
}

function printMsg(data) {
  print("Touch");
  background(255,0,0);
}

// init serial connection
function initSerial() {
  serialController.init();
}
