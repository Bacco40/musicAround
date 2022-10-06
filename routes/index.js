const express = require('express');
const router = express.Router();
const passport = require("passport");
require('../config/passport')(passport);

// Require controller modules.
const user_controller = require('../controllers/userController');
const spotify_controller = require('../controllers/spotifyController');

/// USER ROUTES ///

//Verify log //
router.get('/test', passport.authenticate('jwt', { session: false }), user_controller.test);

// POST request for creating User.
router.post('/signup', user_controller.user_create_post);

// POST request for log in User.
router.post('/login', user_controller.user_log_in_post);

router.get('/login/google',passport.authenticate('google', {scope: ['profile', 'email']}));

// GET request for log in User from Google.
router.get('/login/google/callback', user_controller.google_logIn);

// GET request for User profile for homePage.
router.get('/home/user/:id', passport.authenticate('jwt', { session: false }), user_controller.user_basic_detail);

// GET request for User profile.
router.get('/user/:id', passport.authenticate('jwt', { session: false }), user_controller.user_detail);

// PUT request to edit User detail.
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), user_controller.user_edit_put);

// GET request for friends that the user can add
router.get('/possiblefriend/:id', passport.authenticate('jwt', { session: false }), user_controller.user_get_possible_friend_to_add);

//POST request to send a friend request
router.post('/addFriend/:id', passport.authenticate('jwt', { session: false }), user_controller.user_add_friend);

//PUT request to confirm a friend request
router.put('/confirmFriend/:id', passport.authenticate('jwt', { session: false }), user_controller.user_confirm_friend);

//PUT friend request
router.put('/cancelRequest/:id', passport.authenticate('jwt', { session: false }), user_controller.user_cancel_friend_request);

//PUT remove friend request
router.put('/removeFriend/:id', passport.authenticate('jwt', { session: false }), user_controller.user_remove_friends);

//GET search user
router.get('/search/:id', passport.authenticate('jwt', { session: false }), user_controller.search_user);

/* //PUT add artist to favotite
router.put('/addArtist/:id', passport.authenticate('jwt', { session: false }), user_controller.addArtist_user);

//PUT remove artist from favotite
router.put('/removeArtist/:id', passport.authenticate('jwt', { session: false }), user_controller.removeArtist_user);
*/
///SPOTIFY ROUTES///

//GET spotify token
router.get('/spotify/token', spotify_controller.get_Token)
/*
/// EVENT ROUTES ///

//POST add event to interested
router.post('/addToFavourite/:id', passport.authenticate('jwt', { session: false }), event_controller.addEventToFavourite);

//POST add event to going
router.post('/addToGoing/:id', passport.authenticate('jwt', { session: false }), event_controller.addEventToGoing);

*/

module.exports = router;
