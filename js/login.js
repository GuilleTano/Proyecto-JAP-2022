document.getElementById("loginBtn").addEventListener("click", function(){

    let email = document.getElementById("email");
    let pass = document.getElementById("password");

    if (email.value == "" || pass.value == "") {
        showAlertError();

    }
    else {
        showAlertLogin();
        loginRedirection();
    }
}
);

//Funcion de redireccionamiento
function loginRedirection() {
    window.location.href = "portada.html";
}

//ALERTA CACERAS
function showAlertLogin() {    
    alert("Acceso correcto!");
}
function showAlertError() {
    alert("Error en los datos ingresados");
}

//ALERTAS CON BOOTSTRAP (EN PROGRESO)
function showAlertLogin() {
    document.getElementById("login-correcto").classList.add("show");
}
function showAlertError() {
    document.getElementById("login-error").classList.add("show");
}
