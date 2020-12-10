const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const assistant = new AssistantV1({
    url: 'https://gateway.watsonplatform.net/assistant/api',
    version: '2020-11-15',
    authenticator: new IamAuthenticator({ apikey: 'DsPOWwgUh7R7JV1DO7cdda-coDl17rfzjxEYtX63xS49'})
});
module.exports = {assistant};