# WineOCR

OCR-based tool, used to feed [OpenWines](http://openwines.eu) open-data, using wine bottle labels images:

<img src="https://raw.githubusercontent.com/OpenWines/OpenWinesOCR/master/examples/etiquette_3.jpg"
     height="50%" width="50%">

## Dependencies

These scripts use [nodejs](https://nodejs.org/), dependencies are managed via [npm](https://www.npmjs.com/)

```
$ npm install
```

## Output:

```
$ node wineocr.js etiquette_3.jpg

CHÂTEAU MERCIER

CÔTES DE BOURG

APPELLATION CÔTES DE BOURG CONTRÔLÉE

2000

15H ml
ÇERÊRÏﬁLL MIS EN BOUTEILLE AU CHATEAU

“l |
S.C.E.A. FAMILLE CHETY, PRODUCTEUR A SA|NT—TROJAN (GIRONDE) FRANCE  .
```

The OCR output is both displayed in the console and written in a newly created `[IMAGE_PATH].ocr.txt` file

## Usage:

```
$ node wineocr.js [path] [layout_analysis_option] [language_code]
```

### Example:

```bash
$ node wineocr.js ./examples/etiquette_3.jpg
```

which is the equivalent of the default options:

```bash
$ node wineocr.js examples/etiquette_3.jpg 3 fra
```

Argument details:

- both directory and single file path work, as first argument
- `3` is a layout analysis option for `tesseract` OCR
- `fra` is a language code. Available languages depend on your tesseract installation (see below).

Note that you can either process a whole directory:

```bash
$ node wineocr.js examples/
```

## Installation


### 1/2 - Install tesseract

[tesseract](https://code.google.com/p/tesseract-ocr/) is an open-source project and a madatory dependency for WineOCR.

For Mac OS X:

```bash
brew install tesseract --all-languages
```

For other OS as Windows or GNU/Linux, and details about installing only certain languages packs, check out the [tesseract-ocr Project](https://code.google.com/p/tesseract-ocr/) website.


### 2/2 Install dependencies (node-tesseract, etc.)

```bash
npm install
```


## Options at run:

`layout_analysis_option` argument (see `psm` argument in `node-tesseract` lib) tells Tesseract OCR binary to only run a subset of layout analysis and assume a certain form of image. The options are:
 
- 0 = Orientation and script detection (OSD) only.
- 1 = Automatic page segmentation with OSD.
- 2 = Automatic page segmentation, but no OSD, or OCR.
- 3 = Fully automatic page segmentation, but no OSD. (Default)
- 4 = Assume a single column of text of variable sizes.
- 5 = Assume a single uniform block of vertically aligned text.
- 6 = Assume a single uniform block of text.
- 7 = Treat the image as a single text line.
- 8 = Treat the image as a single word.
- 9 = Treat the image as a single word in a circle.
- 10 = Treat the image as a single character.

`3` seems to be a good option for most wine bottle labels.

## Considering tesseract alternative: OCR APIs

- [Microsoft Project Oxford Visions OCR](https://www.projectoxford.ai/demo/visions#Ocr) (w/ API)


## License

MIT License - See [license](LICENSE) file.

Sources are available at [OpenWines/WineOCR](https://github.com/OpenWines/WineOCR/issues) on Github.


## Issues, support

Please check [OpenWines/WineOCR/issues](https://github.com/OpenWines/WineOCR/issues) page on Github.
