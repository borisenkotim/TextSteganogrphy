
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
  } else console.log("no image loaded");

  reader.readAsDataURL(input.files[0]);
}

hideSecretText = () => {
  let done = steg.encode(document.querySelector('#secretText').value, imgUrl);
  document.querySelector('#encImageText').innerHTML = (
  `<h5>Encoded Image</h5>
  <img id="encImage" width=500 src=${done} alt="" /><br></br>`
  );
}

decodeImage = (input) => {
    if (input.files != null && input.files[0] != null) {
      var reader = new FileReader();
      reader.onload = function(e) {
        let result = steg.decode(e.target.result);
        console.log(result);
        document.querySelector('#decodedTextDes').innerHTML = (`Decoded Text: <i>${result}</i>`);
      };
    }
    reader.readAsDataURL(input.files[0]);
  }


