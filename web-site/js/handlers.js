
var imgUrl;

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
  let done = steg.encode(document.querySelector('#secretText').value, imgUrl);
  document.querySelector('#encImageBlock').innerHTML = (
  `<h5>Encoded Image</h5>
  <img id="encImage" width=400 src=${done} alt="" /><br>
  <button class="btn-secondary">Download</button><br></br>`
  );
}

decodeImage = (input) => {
    if (input.files != null && input.files[0] != null) {
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          let result = steg.decode(e.target.result);
          document.querySelector('#decodedTextDes').innerHTML = (`Decoded Text: <i>${result}</i>`);
        } catch (e) {
          document.querySelector('#decodedTextDes').innerText = (`No Text Found!`);
        }
      };
    }
    reader.readAsDataURL(input.files[0]);
  }


