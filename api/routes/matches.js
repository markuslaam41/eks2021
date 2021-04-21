const express = require("express");
const router = express.Router();
;
const checkAuth = require('../middleware/check-auth');


const MatchesController = require('../controllers/matches')



// Handle incoming GET requests to /matches
router.get("/", checkAuth , MatchesController.matches_get_all) ;


router.post("/", checkAuth, MatchesController.matches_create_match);

 
router.get("/:matchId", checkAuth,MatchesController.matches_get_match);

router.delete("/:matchId", checkAuth,MatchesController.delete_match);

module.exports = router;