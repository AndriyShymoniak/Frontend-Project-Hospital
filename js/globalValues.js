let serverUrl = 'http://localhost:8080/';

let token = window.localStorage.getItem('auth_token');
let role = window.localStorage.getItem('auth_role');

$(document).ready(function (e){
    $.ajaxSetup({
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });

    if(token) {
        var reqType = getUrlVars()["type"];
        window.storage = {};
        window.storage.reqTypeVar = reqType;
        // alert(window.storage.reqTypeVar);
        getContent();
        rightsCheck();
    } else {
        rightsCheck();
    }
})

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function rightsCheck(){
    if(role != "ROLE_ADMIN"){
        document.getElementById('adminPageLink').addEventListener('click', function(e) {
            e.preventDefault();
            alert('У вас немає прав адміністратора!');
        }, false);
    }
    if (role != "ROLE_USER_DOCTOR" || role != "ROLE_USER_PATIENT"){
        document.getElementById('individualPageLink').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Залогуйтесь, щоб зайти в особистий кабінет!');
        }, false);
    }
}