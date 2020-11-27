

var imgUrl;
var dataUrl;
var imageTemp;
var canvas;

fileUploaded = (input) => {
  if (input.files != null && input.files[0] != null) {
    var reader = new FileReader();
    reader.onload = function(e) {
      imgUrl = e.target.result;
      document.querySelector("#regImage").src = imgUrl;
    };
    document.querySelector('#regImageText').innerText = "Uploaded Image";
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
  // TODO: Optional, if have time. Add onClick event for download button that would download the encoded image.
  let messageText = document.querySelector('#secretText').value;
  document.querySelector('#encImageBlock').innerHTML = (
  `<h5>Encoded Image</h5>
  <canvas id="encImage"></canvas>
  <div id="textBlock"><canvas id="hiddenText"></canvas></div><br>`
  );
  canvas = document.getElementById("encImage");
  var ctx = canvas.getContext('2d');
  var textCanvas = document.getElementById('hiddenText');
  var tctx = textCanvas.getContext('2d');
  var img = new Image();
  img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    tctx.font = "30px Arial";
    tctx.fillText(messageText,10,50);
    ctx.drawImage(img,0,0);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var textData = tctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixelsInMsg = 0;
        pixelsOutMsg = 0;
    for (var i = 0; i < textData.data.length; i += 4) {
        if (textData.data[i+3] !== 0) {
            if (imgData.data[i+1]%10 == 7) {
                //do nothing, we're good
            }
            else if (imgData.data[i+1] > 247) {
                imgData.data[i+1] = 247;
            }
            else {
                while (imgData.data[i+1] % 10 != 7) {
                    imgData.data[i+1]++;
                }
            }
            pixelsInMsg++;
        }
        else {
            if (imgData.data[i+1]%10 == 7) {
                imgData.data[i+1]--;
            }
            pixelsOutMsg++;
        }
    }
    ctx.putImageData(imgData, 0, 0);
  };
  document.querySelector('#textBlock').innerHTML = `<button id="downloadBtn" class="btn-secondary" onclick="downloadImage()" >Download</button><br>`;
  img.src = imgUrl;
}

decodeImage = (input) => {
  var decodeCanvas = document.getElementById('decodeImg');
  var dctx = decodeCanvas.getContext('2d');
    if (input.files != null && input.files[0] != null) {
      var reader = new FileReader();
      reader.onload = function(event) {
      try {
          var img2 = new Image();
          img2.onload = function(){
              decodeCanvas.width = img2.width;
              decodeCanvas.height = img2.height;
              dctx.drawImage(img2,0,0);
              var decodeData = dctx.getImageData(0, 0, decodeCanvas.width, decodeCanvas.height);
              for (var i = 0; i < decodeData.data.length; i += 4) {
                  if (decodeData.data[i+1] % 10 == 7) {
                      decodeData.data[i] = 0;
                      decodeData.data[i+1] = 0;
                      decodeData.data[i+2] = 0;
                      decodeData.data[i+3] = 255;
                  }
                  else {
                      decodeData.data[i+3] = 0;
                  }
              }
              dctx.putImageData(decodeData, 0, 0);
          };
          document.querySelector('#decodedTextDes').innerHTML = (`Decoded Text:`);
          img2.src = event.target.result;
        } catch (event) {
          document.querySelector('#decodedTextDes').innerText = (`No Text Found!`);
        }
      };
    }
  reader.readAsDataURL(input.files[0]);
}

downloadImage = () => {
  canvas.toBlob(function(blob) {
    saveAs(blob, "encodedImage.png");
});
}