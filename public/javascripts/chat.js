var contextDialog = '{}';

function sendMessageToAssistant(){
    //recupera msg digitada pelo usuario
    var textMessage = document.getElementById('chat_input').value;
    chat = document.getElementById('chat_txt');
    
    //na primeira chamada (boas vindas), textMessage é undefined
    //então define como vazio para dar erro na API
    if(textMessage === undefined || textMessage === '')
        textMessage = '';
    else
        chat.innerHTML += '<div style="text-align: right;">' + '<b>Você: </b>' + textMessage + '</div>' + '<br>';
    //limpa o campo input
    document.getElementById('chat_input').value = '';
    $.post("/ibmWatson/assistant",
        {text: textMessage, contextDialog},
        function(returnedData, statusRequest){
            if(returnedData.status === 'ERRO')
                alert(returnedData.data);
            else{
                //chat.innerHTML += 'Chatbot --> ' + returnedData.data.result.output.text + '<br>';
                chat.innerHTML += '<div style="text-align: left;">' + '<b>Chatbot: </b>' + returnedData.data.result.output.text + '</div>' + '<br>';
                contextDialog = JSON.stringify(returnedData.data.result.context);
            }
        }
    ).fail(function(returnedData){
        alert('Erro: ' + returnedData.status + ' ' + returnedData.statusText);
    });
}


$(document).ready(function(){
    sendMessageToAssistant();
    document.getElementById('chat_input').focus();
    document.getElementById('chat_input').select();
});

function send_enter(event){
    if (event.keyCode == 13) {     
        console.log(document.getElementById('chat_input').value);
        sendMessageToAssistant();
        event.preventDefault();
    }
}