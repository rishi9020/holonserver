const router = require("express").Router();

const { returnImage, getAllSmartContractData, getTokenURI } = require("../controllers/controller");

// data routers
router.get("/allNFTdata", getAllSmartContractData);

// media
router.get("/image/:tokenId", returnImage);

// token URI
router.get("/token/:tokenId", getTokenURI);

module.exports = router;