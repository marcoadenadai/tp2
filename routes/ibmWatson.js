var express = require('express');
var router = express.Router();
const ibmWatson = require('../lib/ibmWatsonCredentials');


router.post('/assistant', function(req, res, next) {
    var { text, contextDialog } = req.body;
    context = JSON.parse(contextDialog);
    const params = {
        input: {text},
        workspaceId: 'b5460bab-5337-4194-bc0a-4d3936571a90',
        context
    };
    ibmWatson.assistant.message(
        params,
        function (err, response) {
            if(err)
                res.json({status: 'ERRO', data: err.toString()});
            else
                res.json({status: 'OK', data: response});
        }
    );
    
});


module.exports = router;
