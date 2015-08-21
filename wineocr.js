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


Default options:
    
    Recognize French text
    in a single uniform block of text inside given image file

*/

var fs = require('fs'),
    _ = require("underscore"),
    _s = require("underscore.string"),
    tesseract = require('node-tesseract'),
    arguments = process.argv.slice(2),
    image_path = arguments[0],
    tesseract_path = '/usr/local/bin/tesseract'; 





var processOCR = function(image_path, options, callback) {
    var stats = fs.statSync(image_path);
    if(stats.isFile() && hasValidExtension(image_path)) {
        tesseract.process(image_path, options, function(err, text) {
            output_file = image_path + '.ocr.txt';
            console.log(_s.sprintf("%s, size: %s", image_path, getFilesizeInBytes(image_path, false)));
            if(err) {
                output = err; 
            } else {
                output = text;
            }
            fs.writeFile(output_file, output);
            console.log('----------------------------------------------------');
            console.log(output);

            if(callback) {
                callback();
            }
        });
    }
}

var walk = function(currentDirPath, callback) {
    var fs = require('fs'), path = require('path');
    fs.readdirSync(currentDirPath).forEach(function(name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walk(filePath, callback);
        }
    });
}

var hasValidExtension = function(path) {
    var valids = ['jpg', 'jpeg', 'JPG', 'JPEG'];
    var ext = getExtension(path);

    return (-1 < _.indexOf(valids, ext));
}

var getExtension = function(filename) {

    return filename.split('.').pop();
}

var getFilesizeInBytes = function(filename, convertToMegaBytes) {
    var mb = convertToMegaBytes || false;
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];

    if(convertToMegaBytes) {
        fileSizeInBytes = fileSizeInBytes / 1000000.0;
    }

    return fileSizeInBytes
}

arguments[0] = arguments[0] || __dirname + '/examples/etiquette_3.jpg';
arguments[1] = arguments[1] || '3';     // fully automatic page segmentation, but no OSD.
arguments[2] = arguments[2] || 'fra';   // chauvinisim.

var stats = fs.statSync(arguments[0]),
    options = {
    psm: arguments[1],
    l: arguments[2],
    binary: tesseract_path
};

if(stats.isFile()) {
    processOCR(arguments[0], options);
}

if(stats.isDirectory()) {
    walk(arguments[0], function(filePath, stat) {
        processOCR(filePath, options);
    });
}