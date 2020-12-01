// elements of the algorithm for encryption/decryption borrowed from codepen

var imgUrl;
var myCanvas;
const PIXELHOP = 4;
const SEVAN = 7;
const FONT = "30px Arial";

fileUploaded = (input) => {
  // function is called when upload button is pressed
  // function shows the image uploaded and provides input box for entering the text to be encoded
  if (input.files != null && input.files[0] != null) {  // continues only if a specified file type was selected
    var reader = new FileReader();
    reader.onload = function(e) {
      imgUrl = e.target.result;
      document.querySelector("#regImage").src = imgUrl;
    };

    // sets image title
    document.querySelector('#regImageText').innerText = "Uploaded Image";

    // makes input box appear with button to encode input text
    document.querySelector('#hideTextBlock').innerHTML = (
    `<input id="secretText" type="secretText" />
     <button class="btn-primary" onclick="hideSecretText()">
      Hide Text Into Image
     </button><br></br>`
    );

    // reset the next image steps
    document.querySelector('#encImageBlock').innerHTML = ``;
  } else console.log("no image loaded");
  reader.readAsDataURL(input.files[0]);
}

hideSecretText = () => {

  // function is called when "Hide Text Into Image" is selected
  let messageText = document.querySelector('#secretText').value;

  // intializes the canvas elements needed for encryption to happen
  document.querySelector('#encImageBlock').innerHTML = (
  `<h5>Encoded Image</h5>
  <canvas id="encImage"></canvas>
  <div id="textBlock"><canvas id="hiddenText"></canvas></div><br>`
  );
  myCanvas = document.getElementById("encImage");

  // creates new image format that will be the encoded image
  var image = new Image();

  // calls function that runs the algorithm for hiding text
  this.encodeImageHelper(image, messageText);
  document.querySelector('#textBlock').innerHTML = `<button id="downloadBtn" class="btn-secondary" onclick="downloadImage()" >Download</button><br>`;
  image.src = imgUrl;
}

encodeImageHelper = (image, messageText) => {

  // initialize variables for canvas elements and data
  var foreground = myCanvas.getContext('2d');
  var backGroundText = document.getElementById('hiddenText');
  var background = backGroundText.getContext('2d');
  
  // loads image that the reader loaded
  image.onload = function(){

    // sets the demensions for the encoded image to be the same as uploaded image
    myCanvas.width = image.width;
    myCanvas.height = image.height;
    background.font = FONT;           // sets encrypted text font
    background.fillText(messageText,10,50);
    foreground.drawImage(image,0,0);  // sets the image seen to be the image uploaded
    
    // variables for image and text element
    var imgCanvas = foreground.getImageData(0, 0, myCanvas.width, myCanvas.height);
    var textCanvas = background.getImageData(0, 0, myCanvas.width, myCanvas.height);

    // iterates through text data and hides pixels based on position
    for (var i = 0; i < textCanvas.data.length; i += PIXELHOP) {
        if (textCanvas.data[i+3] !== 0) {
            if (imgCanvas.data[i+1] % 10 != SEVAN && imgCanvas.data[i+1] <= 247) {
              while (imgCanvas.data[i+1] % 10 != SEVAN) {
                  imgCanvas.data[i+1]++;
              }
            }
            else if (imgCanvas.data[i+1] > 247) imgCanvas.data[i+1] = 247;
        }
        else if (imgCanvas.data[i+1] % 10 == SEVAN) imgCanvas.data[i+1]--;
    }

    // sets the manipulated image with the the hidden text to be the image seen
    foreground.putImageData(imgCanvas, 0, 0);
  };
}

decodeImage = (input) => {
  // function decodes, or makes seen the hidden text in an image uploaded
  // variables for decode canvas elements and data
  var imgDiv = document.getElementById('decodeImg');
  var imgCanvas = imgDiv.getContext('2d');
    if (input.files != null && input.files[0] != null) { // continues only if a specified file type was selected
      var reader = new FileReader();
      reader.onload = function(event) {
        // using try catch inc case their is an error when decoding
        try {
          // creates new canvas image wich will end up being just the decoded text
          var image = new Image();
          image.onload = function(){

              // sets the dimensions for the decoded image (text canvas) to be the same as the uploaded image
              imgDiv.width = image.width;
              imgDiv.height = image.height;
              imgCanvas.drawImage(image,0,0);

              // gets the image data for the uploaded image
              var decoded = imgCanvas.getImageData(0, 0, imgDiv.width, imgDiv.height);
              for (var i = 0; i < decoded.data.length; i += PIXELHOP) {
                  // reversing the algorithm for encrypting we decrypt the image to show any hidden text or object
                  if (decoded.data[i+1] % 10 == SEVAN) {
                      decoded.data[i+3] = 255;
                      decoded.data[i+2] = 0;
                      decoded.data[i+1] = 0;
                      decoded.data[i] = 0;
                  }
                  else decoded.data[i+3] = 0;
              }

              // sets the decoded text/image data into the canvas element shown
              imgCanvas.putImageData(decoded, 0, 0);
          };
          document.querySelector('#decodedTextDes').innerHTML = (`Decoded Text:`);
          image.src = event.target.result;   // sets final results to the new image appearing on screen
        } catch (event) {
          document.querySelector('#decodedTextDes').innerText = (`No Text Found!`);
        }
      };
    }
  reader.readAsDataURL(input.files[0]);
}

downloadImage = () => {
  // this function uses a file saver library to properly download the image when the download btn is pressed.
  myCanvas.toBlob(function(blob) {
    saveAs(blob, "encodedImage.png");
  });
}