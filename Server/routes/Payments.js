// Import the required modules
const express = require("express");
const router = express.Router();
const {
  capturePayment,
  // verifySignature,
  verifySignature  ,
} = require("../controller/payments");
const { Auth, isInsructor, isStudent, isAdmin } = require("../middleware/Auth");
router.post("/capturePayment", Auth, isStudent, capturePayment);
router.post("/verifySignature", Auth, isStudent, verifySignature );
router.post(
   Auth,
   isStudent,
 
);
// router.post("/verifySignature", verifySignature)

module.exports = router
