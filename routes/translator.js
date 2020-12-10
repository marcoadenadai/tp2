var express = require('express');
var router = express.Router();

const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const languageTranslator = new LanguageTranslatorV3({
  version: '2018-05-01',
  authenticator: new IamAuthenticator({
    apikey: '-2eXXgVxHnhDnWFwqj-8CJ4XJJT3gABBqdx2P0ToeQHJ',
  }),
  serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/15fafed3-d63e-40e8-b5b5-a99dec929869',
});
  
 router.get('/list', function(req, res, next) {;
    languageTranslator.listLanguages()
    .then(languages => {
      var x = languages.result.languages;
      var linguas = [];
  
      for(i=0;i<x.length;i++){
        if(x[i].supported_as_source == true && x[i].supported_as_target == true){
          var tmp = {prefix: x[i].language, nome: x[i].native_language_name};
          linguas.push(tmp);
        }
      }
      res.json(linguas);
    })
    .catch(err => {
      console.log('error:', err);
  });
});  

router.post('/', function(req, res, next) {
    var { src, target, txt } = req.body;
    const params = {
        text: txt,
        source: src,
        target: target,
        domain: "general"
    };
    languageTranslator.translate(params).then( result => {
            console.log("RESULT = "+JSON.stringify(result.result.translations[0].translation));
            res.json({status: req.status, data: result.result.translations[0].translation});
        }).catch(err => {
            console.log('ERRO = ', err);
            res.json({status: req.status, data: res});
    });
});

module.exports = router;