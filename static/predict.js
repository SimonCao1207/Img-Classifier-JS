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
    $("#selected-image").attr('src', dataURL);
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
  if (modelName == "MobileNet"){
    const modelUrl = 'https://tfhub.dev/google/imagenet/mobilenet_v2_140_224/classification/2';
    model = await tf.loadGraphModel(modelUrl, {fromTFHub: true})
  }
  else model = await tf.loadLayersModel(`http://localhost:8081/model/${modelName}/model.json`)
  $('.progress-bar').hide()
}

// TODO: Load pretrained models from https://github.com/tensorflow/tfjs-models


const round = (num) => Math.round(num * 100) / 100

$("#predict-button").click(async function(){
  let image = $("#selected-image").get(0)
  console.log("image". image);
  let tensor = preprocessImage(image, $("#model-selector").val())
  let prediction = await model.predict(tensor).data()
  let top5 = Array.from(prediction).map(function(p,i){
      return {
        probability: p,
        className: IMAGENET_CLASSES[i]
      }
    }).sort(function(a, b){ 
      return b.probability - a.probability
    }).slice(0, 5)

    $("#prediction-list").empty()
  top5.forEach(function(pred, i){

    $("#prediction-list").append(`
      <div class="skill-container">
        <p>${pred.className}</p>
        <div class="skill p${i+1}" style="width: ${pred.probability*100}%">${round(pred.probability*100)}%</div>
      </div>
    `)
  })
})


function preprocessImage(image, modelName){
  
  let tensor = tf.browser.fromPixels(image)
      .resizeNearestNeighbor([224,224])
      .toFloat()

  if (modelName == "VGG16"){
    let meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939])
    return tensor.sub(meanImageNetRGB)
                .reverse(2)
                .expandDims()
  }

  else if (modelName == "MobileNet"){
    let offset = tf.scalar(127.5)
    return tensor.sub(offset)
                 .div(offset)
                 .expandDims()
  }

  else {
  // TODO: Preprocess Image before input into model
    return tensor.expandDims()
  }
}