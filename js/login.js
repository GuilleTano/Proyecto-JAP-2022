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

function showAlertLogin() {
    
    alert("Acceso correcto!");

}

function showAlertError() {

    alert("Error en los datos ingresados");

}

function loginRedirection() {
    window.location.href = "portada.html";
}
