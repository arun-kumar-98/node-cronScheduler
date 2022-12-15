const controller = require("../controller/userController");
const router = require("express").Router();

router.post("/entry", controller.addEntry);



module.exports = router;
