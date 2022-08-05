import { IMAGENET_CLASSES } from "./imagenet_classes";

$(document).ready()
{
  $('.progress-bar').hide()
}

$('#image-selector').change(function(){
  let reader = new FileReader()
  reader.onload = () => {
    let dataURL = reader.result;
    $("#selected-image").attr("src", dataURL)
    $('#prediction-list').empty()
  }
  let file = $('#image-selector').prop('files')[0]
  reader.readAsDataURL(file)
})