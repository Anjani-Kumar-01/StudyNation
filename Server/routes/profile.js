const express = require("express")
const router = express.Router()
const { Auth, isInstructor } = require("../middleware/auth");

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,

} = require("../controller/Profile");

// // ********************************************************************************************************
// //                                      Profile routes
// // ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", Auth, deleteAccount)
router.put("/updateProfile", Auth, updateProfile)
router.get("/getUserDetails",  Auth, getAllUserDetails)
// Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
// router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router
