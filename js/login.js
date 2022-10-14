function loginRedirection() {
    window.location.href = "portada.html";
}

document.addEventListener("DOMContentLoaded", function(){

    localStorage.clear();

    document.getElementById("loginBtn").addEventListener("click", function(){
        let faltaDato = false;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        if (email === "") {
            
            faltaDato = true;
            let mailAlert= `
            <div class="container">
                <div class="alert alert-danger alert-dismissible text-center" role="alert">
                    <div>Debe ingresar un mail valido</div>
                    <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            `;
            document.getElementById("show-alerts").innerHTML = mailAlert;
        }
        if (pass === "") {
                    
            faltaDato = true;
            let passAlert= `
            <div class="container">
                <div class="alert alert-danger alert-dismissible text-center" role="alert">
                    <div>Debe ingresar un mail valido</div>
                    <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            `;
            document.getElementById("show-alerts").innerHTML = passAlert;
        }
        if(!faltaDato){
            alert("Acceso correcto!");
            localStorage.setItem("mailUsuario", email);
            loginRedirection();
        }
    }
    );
});