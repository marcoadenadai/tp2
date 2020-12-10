var src, tgt;
var lngs;


function translate(src, target, txt){
    $.post("/translator/",{src, target, txt},
    function(data, status){
        //status = sucess
        //alert(JSON.stringify(data.data));
        let tmp = JSON.stringify(data.data);
        tmp = tmp.replace(/['"]+/g, '');
        //tmp = tmp.replace(/\r?\n/g, '<br/>');
        document.getElementById("output_text").value = tmp;
    }
).fail(function(data){
    alert("ERRO("+status+"): "+JSON.stringify(data));
});
}

function onclick_lang1(index){
    src=lngs[index].prefix;
    document.getElementById("btn_lang1").innerHTML = lngs[index].nome;
}

function onclick_lang02(index){
    tgt=lngs[index].prefix;
    document.getElementById("btn_lang2").innerHTML = lngs[index].nome;
}

function load_langs(){
    for(i=0;i<lngs.length;i++){
        document.getElementById("drop1").innerHTML += 
    "<a class=\"dropdown-item\" onClick=\"onclick_lang1("+i+");\">"+lngs[i].nome+"</a>";
    document.getElementById("drop2").innerHTML += 
    "<a class=\"dropdown-item\" onClick=\"onclick_lang02("+i+");\">"+lngs[i].nome+"</a>";
    }
}

function update_traduzir(){
    translate(src, tgt, document.getElementById("input_text").value);
}
    

function update_keydown(event){
    if (event.keyCode == 13) {     
        if(event.shiftKey){
            event.stopPropagation();
        } else {
            update_traduzir();
            event.preventDefault();
        }
    }
}


function get_languages(){
    lngs = [];
    console.log("get_languages");
    
    //let
    $.get("translator/list",
    function(data, status){
        if(status === 'success'){
            console.log(data);
            let i;
            for(i=0;i<data.length;i++ )
                lngs.push(data[i]);
            load_langs();
            return data;
        }
        else
            return null;
    });
}


$(document).ready(function(){
    get_languages();
    src='en';
    tgt='pt';
});
