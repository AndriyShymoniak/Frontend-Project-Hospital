let serverUrl = 'http://localhost:8080/';

let token = window.localStorage.getItem('auth_token');
let role = window.localStorage.getItem('auth_role');
let id = window.localStorage.getItem('auth_id');

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
        rightsCheck();
        changeLoginIfLogged();
        accessToIndividualPage();
    } else {
        rightsCheck();
        changeLoginIfUnlogged();
    }
})

$(document).ready(function(){
    $('#loginLink').on('click', function(e){
        e.preventDefault();
        if (token == null){
            $(location).attr('href', 'sign_in.html');
        } else {
            window.localStorage.removeItem('auth_token');
            window.localStorage.removeItem('auth_role');
            window.localStorage.removeItem('auth_id');
            $(location).attr('href', 'index.html');
        }
    })
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
    if (role != "ROLE_USER_DOCTOR" && role != "ROLE_USER_PATIENT"){
        document.getElementById('individualPageLink').addEventListener('click', function(e) {
            e.preventDefault();
            alert('Залогуйтесь, щоб зайти в особистий кабінет!');
        }, false);
    }
}

function changeLoginIfLogged() {
    $('#loginLink').text("Вийти");
}

function changeLoginIfUnlogged() {
    $('#loginLink').text("Увійти");
}

function accessToIndividualPage() {
    $('#individualPageLink').on('click', function (e) {
        e.preventDefault();

        if (role == "ROLE_USER_DOCTOR"){
            $(location).attr('href', 'doctor_page.html?doctor_id=' + id);
        } else if (role == "ROLE_USER_PATIENT"){
            $(location).attr('href', 'patient_page.html?patient_id=' + id);
        }

        // $(location).attr('href', 'http://stackoverflow.com');
    })
}