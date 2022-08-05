import { IMAGENET_CLASSES } from "./imagenet_classes.js"

$(document).ready()
{
  $('.progress-bar').hide()
}

// Show image
$('#image-selector').change(function(){
  let reader = new FileReader()
  reader.onload = function(){
    let dataURL = reader.result;
    $("#selected-image").attr("src", dataURL);
    $('#prediction-list').empty();
  }
  let file = $('#image-selector').prop('files')[0]
  reader.readAsDataURL(file)
})



