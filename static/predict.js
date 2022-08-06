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

// Select model
$("#model-selector").change(function(){
  loadModel($("#model-selector").val())
  $('.progress-bar').show()
})

let model
// Load pretrained model
async function loadModel(modelName){
  model = await tf.loadLayersModel(`http://localhost:8081/model/${modelName}/model.json`)
  $('.progress-bar').hide()
}

// TODO: Load pretrained models from https://github.com/tensorflow/tfjs-models


$("#predict-button").click(async function(){
  let image = $("selected-image").get(0)
  console.log(image);
  // let tensor = tf.browser.fromPixels(image).toFloat()
  // tensor.print()
  // let tensor = preprocessImage(image, $("#model-selector").val)
  // let prediction = await model.predict(tensor).data()
  // console.log("prediction", prediction);
})

function preprocessImage(image, modelName){
  // TODO: Preprocess Image before input into model
  let tensor = tf.browser.fromPixels(image).toFloat()
  return tensor.expandDims();
}