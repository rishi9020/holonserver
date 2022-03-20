const router = require("express").Router();

const { returnP5JSRenderedImageOnBrowser, getAllSmartContractData, getTokenURI, generateSVGFormatImage, addSVGForToken } = require("../controllers/controller");

// data routers
router.get("/allNFTdata", getAllSmartContractData);

// media
router.get("/generator/:tokenId", returnP5JSRenderedImageOnBrowser);

// image
router.get("/image/:tokenId", generateSVGFormatImage);

// token URI
router.get("/token/:tokenId", getTokenURI);

// Store SVG data
router.post("/svg/:tokenHash", addSVGForToken);

module.exports = router;