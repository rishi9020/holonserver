const {
  getWeb3andContractInstances,
} = require("../utils/getWeb3andContractInstances");
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

// circulatedTokens [
//   '1490', '771',
//   '1251', '313',
//   '697',  '1334',
//   '239',  '1432',
//   '554',  '1286'
// ]

const returnP5JSRenderedImageOnBrowser = async (req, res) => {

  try {
    const { web3, LedNFT_CONTRACT, ICT_CONTRACT } =
      await getWeb3andContractInstances();
    const { tokenId } = req.params;

    const hash = await LedNFT_CONTRACT.methods.tokenHash(+tokenId).call();

    console.log("---------th: ", hash)
    if (hash === "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      // token id does't exist (not minted yet)
      console.log("Not minted yet");
    }


    const filePath = path.join(__dirname, '..', 'views', 'indexx.ejs');
    console.log("---------filePath: ", filePath)
    // Render page using renderFile method

    //    fs.readFile(filePath, function read(err, data) {
    //     if (err) {
    //       console.log("----------w1: ",err)
    //         throw err;
    //     }
    //     const content = data;

    //     // Invoke the next step here however you like
    //     console.log(content);   // Put all of the code here (not the best solution)
    //     // processFile(content);   // Or put the next step in a function and invoke it
    // });

    if (hash === "0x0000000000000000000000000000000000000000000000000000000000000000") {
      const notMintedFilePath = path.join(__dirname, '..', 'views', 'notMinted.ejs');
      ejs.renderFile(notMintedFilePath, {},
        {}, function (err, template) {
          if (err) {
            console.log("Error while ejs.renderFile: ", err)
            throw err;
          } else {
            res.end(template);
          }
        });
    } else {
      ejs.renderFile(filePath, {},
        {}, function (err, template) {
          if (err) {
            console.log("Error while ejs.renderFile: ", err)
            throw err;
          } else {

            let result = template.replace('$TOKEN_HASH', hash)
            // console.log("============result: ", template)
            res.end(result);
          }
        });
    }
  } catch (error) {
    console.error("ERROR: ", error);
  }

};

const addSVGForToken = async (req, res) => {
  try {
    console.log("----------reqBody: ", req.body.svg_base64_data.length);
    console.log("--------------req.params: ", req.params);
    fs.writeFile(`./images/${req.params.tokenHash}.txt`,  req.body.svg_base64_data, (err) => {
      if (err)
        console.log("E@@@@@:, ", err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        // console.log(fs.readFileSync("books.txt", "utf8"));
      }
    });

    return res.send({ success: true })
  } catch (error) {
    console.error("ERROR:: ", error);
    return res.send({ success: false })
  }
}

const generateSVGFormatImage = async (req, res) => {

  try {
    const { web3, LedNFT_CONTRACT, ICT_CONTRACT } =
      await getWeb3andContractInstances();
    const { tokenId } = req.params;

    const hash = await LedNFT_CONTRACT.methods.tokenHash(+tokenId).call();

    console.log("---------th: ", hash)
    let filePath;
    if (hash === "0x0000000000000000000000000000000000000000000000000000000000000000"
    ) {
      // token id does't exist (not minted yet)
      console.log("Not minted yet");
      filePath = path.join(__dirname, '..', 'images', 'notMinted.txt');
     
    } else {
      filePath = path.join(__dirname, '..', 'images', hash);
    }


    
    console.log("---------filePath: ", filePath)

    const svgData = fs.readFileSync(filePath, { encoding: 'utf-8' });


      var base64Data = svgData.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      var img = Buffer.from(base64Data, 'base64');
    
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img);

  //     console.log("---------ss-----------: ")
  //     // res.setHeader('Content-Type', 'image/svg+xml');
  //     loadSvgFile(filePath)
  // .then(() => console.log('SVG Loaded successfully'))

  //     console.log("-------------dd")
      // res.sendFile(filePath);
      // res.send(svgData)
      
    // Render page using renderFile method

    //    fs.readFile(filePath, function read(err, data) {
    //     if (err) {
    //       console.log("----------w1: ",err)
    //         throw err;
    //     }
    //     const content = data;

    //     // Invoke the next step here however you like
    //     console.log(content);   // Put all of the code here (not the best solution)
    //     // processFile(content);   // Or put the next step in a function and invoke it
    // });

    // if (hash === "0x0000000000000000000000000000000000000000000000000000000000000000") {
    //   const notMintedFilePath = path.join(__dirname, '..', 'views', 'notMinted.ejs');
    //   ejs.renderFile(notMintedFilePath, {},
    //     {}, function (err, template) {
    //       if (err) {
    //         console.log("Error while ejs.renderFile: ", err)
    //         throw err;
    //       } else {
    //         res.end(template);
    //       }
    //     });
    // } else {
     

      // ejs.renderFile(filePath, {},
      //   {}, function (err, template) {
      //     if (err) {
      //       console.log("Error while ejs.renderFile: ", err)
      //       throw err;
      //     } else {

      //       let result = template.replace('$TOKEN_HASH', hash)
      //       res.end(result);
      //     }
      //   });
    // }
  } catch (error) {
    console.error("ERRORR: ", error);
  }

};


const getAllSmartContractData = async (req, res) => {
  try {
    console.log('---------c1')
    const { LedNFT_CONTRACT } =
      await getWeb3andContractInstances();
      console.log('---------c2')

      let tokenIdToData = {};

    let circulatedTokens = await LedNFT_CONTRACT.methods.allMintedId().call();
    console.log("circulatedTokens", circulatedTokens);
    let totalSupply = circulatedTokens.length;
    console.log("----------totalSupply: ", totalSupply)

    for (let i = 0; i < totalSupply; i++) {
      let blinkingPattern = await LedNFT_CONTRACT.methods
        .getBlinkPatternOfTokenID(circulatedTokens[i])
        .call();

      const hash = await LedNFT_CONTRACT.methods
        .tokenHash(circulatedTokens[i])
        .call();

      tokenIdToData[circulatedTokens[i]] = {
        pulse: blinkingPattern,
        token_hash: hash,
      };
    }
    // console.log("tokenIdToData", tokenIdToData);

    let nodes = [];

    for (let i = 1; i <= 2048; i++) {
      if (circulatedTokens.includes(i + "")) {
        nodes.push(tokenIdToData[i + ""]);
      } else {
        nodes.push({
          pulse: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
          token_hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
          token_id: i
        });
      }
    }
    // Add token_id  as well in the Obj

    return res.status(200).json([{ nodes }]);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    // console.log(err);
    return res.status(500).send({ status: "error" });
  }
};


const getTokenURI = async (req, res) => {
  try {

    const { LedNFT_CONTRACT } =
      await getWeb3andContractInstances();
    const { tokenId } = req.params;

    let tokenObj = {
      "description": "Holon project",
      "external_url": process.env.EXTERNAL_URL,
      "image": process.env.IMAGE_URL + tokenId,
      "generator_url": process.env.GENERATOR_URL + tokenId,
      "name": "Holon Node",
      "attributes": []
    }

    const hash = await LedNFT_CONTRACT.methods.tokenHash(+tokenId).call();

    console.log("---------th: ", hash)
    if (hash != "0x0000000000000000000000000000000000000000000000000000000000000000") {
      let attributes = _getAttributes(hash)

      tokenObj.attributes = attributes;
    }

    return res.send(tokenObj);
  } catch (err) {
    console.log("error");
    console.log(err);
    return res.status(500).send({ status: "error" });
  }
};

function _getAttributes(tokenhash) {
  let p = [];
  for (let i = 0; i < 64; i += 2) {
    p.push(tokenhash.substring(i + 2, i + 4));
  }

  let rns = p.map((x) => {
    return parseInt(x, 16) % 100;
  });

  // Dimensionless Canvas setup
  var DEFAULT_SIZE = 1500;
  // var WIDTH = window.innerWidth * 0.25;
  // var HEIGHT = window.innerWidth * 0.25;
  // var DIM = Math.min(WIDTH, HEIGHT);
  // var M = DIM / DEFAULT_SIZE;
  var M = 982 / 1500;
  // ------ Traits -----

  let n = 0;
  let oR = 900 * M;
  let iR = rns[0] < 5 ? 1 * M : rns[0] <= 60 ? 660 * M : 250 * M;

  let strokeScale = rns[1] < 10 ? 0.2 * M : rns[1] < 98 ? 1 * M : 20 * M;
  let strokeScaleN =
    rns[1] < 10 ? "Micro" : rns[1] < 98 ? "Small Stroke" : "Thick";

  let strokeV = rns[2] < 10 ? 1 : rns[2] <= 80 ? 1.5 : 3;
  let strokeVN =
    rns[2] < 10
      ? "Uniform"
      : rns[2] <= 80
        ? "Medium Variation"
        : "Large Variation";

  // Length of lines probablilty
  let strokeLength = rns[3] < 10 ? 5 : rns[3] <= 60 ? 10 : 20;
  let strokeLengthN =
    rns[3] < 10 ? "Short" : rns[3] <= 60 ? "Medium Length" : "Long";

  let spacing = rns[4] < 25 ? 0.8 : rns[4] <= 90 ? 1 : 3;
  let spacingN = rns[4] < 25 ? "Overlap" : rns[4] <= 90 ? "Tight" : "Spaced";

  let phase =
    rns[6] < 9
      ? 0
      : rns[6] <= 55
        ? 0.01
        : rns[6] <= 60
          ? 0.02
          : rns[6] <= 70
            ? 0.007
            : rns[6] <= 90
              ? 0.1
              : 1;
  let phaseN =
    rns[6] < 9
      ? "Straight"
      : rns[6] <= 55
        ? "Gentle"
        : rns[6] <= 60
          ? "Rolling"
          : rns[6] <= 70
            ? "Offset"
            : rns[6] <= 90
              ? "Cross"
              : "Vibration";

  let gap = rns[5] < 80 ? 0 : rns[5] <= 90 ? 1 : rns[5] <= 98 ? 2 : 4;
  let gapN =
    rns[5] < 80
      ? "Air Tight"
      : rns[5] <= 90
        ? "Small Gap"
        : rns[5] <= 98
          ? "Breath"
          : "Spaced out";
  let t = 0; // Angle set to 0

  let colp0 = [147, 27, 79]; //
  let colp1 = [65, 190, 200]; //tur
  let colp2 = [230, 80, 90]; //
  let colp3 = [240, 228, 70];
  let colp4 = [26, 230, 170];
  let colp5 = [114, 58, 240];
  let colp6 = [28, 98, 120];
  let colp7 = [242, 220, 196]; // Cream
  let colp8 = [10, 102, 141]; // Turq
  let colp9 = [30, 30, 32]; //
  let colp10 = [10, 40, 90]; // Blue
  let colp11 = [217, 35, 68]; // Red
  let colp12 = [242, 159, 5]; // D Orange
  let colp13 = [75, 40, 90]; // D purple

  let colourpallet = [
    colp1,
    colp2,
    colp3,
    colp4,
    colp5,
    colp6,
    colp7,
    colp8,
    colp9,
    colp0,
  ];

  console.log("---strokeScale: ", strokeScale, strokeScaleN)
  console.log("-----strobeV: ", strokeV, strokeVN);
  console.log("---strokeLength: ", strokeLength, strokeLengthN);
  console.log("----spacing: ", spacing, spacingN);
  console.log("----phase: ", phase, phaseN);
  console.log("----gap: ", gap, gapN);

  return [
    {
      "display_type": "boost_number",
      "trait_type": strokeScaleN, 
      "value": strokeScale
    },
    {
      "display_type": "boost_number",
      "trait_type": strokeVN, 
      "value": strokeV
    },
    {
      "display_type": "boost_number",
      "trait_type": strokeLengthN, 
      "value": strokeLength
    },
    {
      "display_type": "boost_number",
      "trait_type": spacingN, 
      "value": spacing
    },
    {
      "display_type": "boost_number",
      "trait_type": phaseN, 
      "value": phase
    },
    {
      "display_type": "boost_number",
      "trait_type": gapN, 
      "value": gap
    },
    {
      "trait_type": "testtype", 
      "value": "testval" 
    }
  ]
}

module.exports = { getAllSmartContractData, returnP5JSRenderedImageOnBrowser, getTokenURI, generateSVGFormatImage, addSVGForToken };