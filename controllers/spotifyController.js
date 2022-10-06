require('dotenv/config');

exports.get_Token = function(req, res, next) {
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID_SPOTIFY + ':' + process.env.SPOTIFY_SECRET_KEY).toString('base64'))
        },
        form: {
        grant_type: 'client_credentials'
        },
        json: true
    };
    
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            return res.json({token: body.access_token} );
        }
        else{
            return res.json(error);
        }
    });
}