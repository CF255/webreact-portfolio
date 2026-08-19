const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/Trace");
const router = express.Router();
const User = require("../schema/user");



router.get("/",  (req, res, )=> {
  
  log.info("user", req.user);

  res.json(jsonResponse(200, req.user));

});



module.exports = router;
