/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const inputImageUri = 'gs://karina-thesis-bucket/1.jpg';
process.env["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/karinahy/Documents/NYU/00_THESIS/image-to-text-a59745bb9362.json";

// CHANGE THIS FOR EACH FOLDER
const bucketName = 'gs://chile-signs/05-street/';
const startFile = 9000;
const endFile = 9056;

// Imports the Google Cloud client libraries
const {ImageAnnotatorClient} = require('@google-cloud/vision').v1;

// Instantiates a client
const client = new ImageAnnotatorClient();

// You can send multiple images to be annotated, this sample demonstrates how to do this with
// one image. If you want to use multiple images, you have to create a request object for each image that you want annotated.
async function asyncBatchAnnotateImages() {
  // Set the type of annotation you want to perform on the image
  // https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.Feature.Type
  const features = [{type: 'LABEL_DETECTION'}, {type: 'TEXT_DETECTION'}, {type: 'IMAGE_PROPERTIES'}, {type: 'OBJECT_LOCALIZATION'}];

  // Build the image request object for that one image. Note: for additional images you have to create
  // additional image request objects and store them in a list to be used below.
  const imageRequests = [];

  for(let i=startFile; i<=endFile; i++) {
    let fname = `${i}`.padStart(5,'0');
    imageRequests.push(
      {
        image: {
          source: { imageUri: `${bucketName}${fname}.jpg` },
        },
        features: features,
      }
    )
  }


  // Set where to store the results for the images that will be annotated.
  const outputConfig = {
    gcsDestination: {
      uri: bucketName,
    },
    batchSize: 100, // The max number of responses to output in each JSON file
  };

  // Add each image request object to the batch request and add the output config.
  const request = {
    requests: imageRequests,
    outputConfig,
  };

  // Make the asynchronous batch request.
  const [operation] = await client.asyncBatchAnnotateImages(request);

  // Wait for the operation to complete
  const [filesResponse] = await operation.promise();

  // The output is written to GCS with the provided output_uri as prefix
  const destinationUri = filesResponse.outputConfig.gcsDestination.uri;
  console.log(`Output written to GCS with prefix: ${destinationUri}`);
}

asyncBatchAnnotateImages();
