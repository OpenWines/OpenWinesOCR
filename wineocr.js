/*

psm: Set Tesseract to only run a subset of layout analysis
and assume a certain form of image. The options are:
 
    0 = Orientation and script detection (OSD) only.
    1 = Automatic page segmentation with OSD.
    2 = Automatic page segmentation, but no OSD, or OCR.
    3 = Fully automatic page segmentation, but no OSD. (Default)
    4 = Assume a single column of text of variable sizes.
    5 = Assume a single uniform block of vertically aligned text.
    6 = Assume a single uniform block of text.
    7 = Treat the image as a single text line.
    8 = Treat the image as a single word.
    9 = Treat the image as a single word in a circle.
    10 = Treat the image as a single character.

*/

// Recognize French text in a single uniform block of text inside given image file

var tesseract = require('node-tesseract'),
    arguments = process.argv.slice(2),
    image_path = arguments[0],
    tesseract_path = '/usr/local/bin/tesseract'; 

arguments[1] = arguments[1] || '3';     // fully automatic page segmentation, but no OSD.
arguments[2] = arguments[2] || 'fra';   // chauvinisim.

var options = {
        psm: arguments[1],
        l: arguments[2],
        binary: tesseract_path
    };

tesseract.process(image_path, options, function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log(text);
    }
});