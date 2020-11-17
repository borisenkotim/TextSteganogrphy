
var imgUrl;

fileUploaded = (input) => {
  if (input.files != null && input.files[0] != null) {
    var reader = new FileReader();
    reader.onload = function(e) {
      imgUrl = e.target.result;
      document.querySelector("#regImage").src = imgUrl;
    };
  } else console.log("no image loaded");

  reader.readAsDataURL(input.files[0]);
}

hideSecretText = () => {
  let done = steg.encode(document.querySelector('#secretText').value, imgUrl);
  document.querySelector("#encImage").src = done;
}

decodeImage = (input) => {
    if (input.files != null && input.files[0] != null) {
      var reader = new FileReader();
      reader.onload = function(e) {
        let result = steg.decode(e.target.result);
        console.log(result);
        document.querySelector('#decodedText').innerText = result;
      };
    }
    reader.readAsDataURL(input.files[0]);
  }


