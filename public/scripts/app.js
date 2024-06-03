const nav = document.getElementById('nav')
const footer = document.getElementById('footer')

const home = '<a href="http://127.0.0.1:5500/index.html" class="active">Home</a>'
const login = '<a href="http://127.0.0.1:5500/public/pages/login.html">Login</a>'
const team = '<a href="http://127.0.0.1:5500/public/pages/team.html" hidden>Team</a>'
const ranking = '<a href="http://127.0.0.1:5500/public/pages/ranking.html" hidden>Ranking</a>'
const koPase = '<a href="" hidden>Ranking</a>'
const winner = '<a href="" hidden>Ranking</a>'
let navLink = ''

if (localStorage.getItem('login') !== null) {
    localStorage.setItem('login', 'false');
}

if (localStorage.getItem('login') === 'false') {
    navLink = home + login
}
else
{
    navLink = home + team
}
//condiciones para cuando empiece el partido


function navBar() {
    nav.innerHTML = `
    <input type="checkbox" id="nav-check">
    <div class="nav-header">
        <span class="nav-img">
            <img src="./public/assets/img/logo.jpg" alt="logo baloncesto">
        </span>
            Sport Team
    </div>
    <div class="nav-btn">
        <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
        </label>
    </div>
    <div class="nav-links">
        ${navLink}
    </div>
    `
    footer.innerHTML = `
    <div class=”footer-content”>
        <a href="https://www.facebook.com/?locale=es_ES"><img src="./public/assets/logos/icon-facebook.svg"
                alt="icono y link de faceboock"></a>
        <a href="https://www.instagram.com/accounts/login/"><img src="./public/assets/logos/icon-instagram.svg"
                alt="icono y link de instagram"></a>
        <a href="https://x.com/?lang=es"><img src="./public/assets/logos/icon-x.svg" alt="icono y link de x"></a>
        <a href="https://github.com/"><img src="./public/assets/logos/icon-github.svg"
                alt="icono y link de github"></a>
    </div>
    <a><img src="./public/assets/logos/icon-copyright.png" alt="icono de copyright"></a>
    `
};

//localStorage.setItem('name', nombre.value);
//localStorage.getItem('name');
//localStorage.setItem('testp', ["hola","pastel","Tururi",["hola dentro","hola dentro 2"]]);
// El arreglo:
//var array = [
//                ["icono Italia", "Italia"],
//                ["icono Espana", "Espana"],
//                ["icono Brazil", "Brazil"],
//                ["icono Germany", "Germany"]
//            ];
////// Se guarda en localStorage despues de JSON stringificarlo 
//localStorage.setItem('myArray', JSON.stringify(array));

// Obtener el arreglo de localStorage

//var array = localStorage.getItem('myArray');
//// Se parsea para poder ser usado en js con JSON.parse :)
//array = JSON.parse(array);



const tabla = document.getElementById('tabla');

function llenarTabla() {
    if (localStorage.getItem('myArray') !== null) {
        let tab = JSON.parse(localStorage.getItem('myArray'));
        let temp = '';
        tab.forEach(element => {
            temp = temp + `<tr>
                                <td>${element[0]}</td>
                                <td>${element[1]}</td>
                                <td></td>
                            </tr>
                        `;
        });
        tabla.innerHTML = `
            <tr class="destacado">
                <td>Bandera</td>
                <td>Nombre</td>
                <td></td>
            </tr>
            ${temp}
        `;
    } else {
        tabla.innerHTML = `
                        <tr class="destacado">
                            <td>Bandera</td>
                            <td>Nombre</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Introdusca un equipo.</td>
                            <td></td>
                        </tr>
        `
    }
};

//var array = [
//                ["icono Italia", "Italia"],
//                ["icono Espana", "Espana"],
//                ["icono Brazil", "Brazil"],
//                ["icono Germany", "Germany"]
//            ];
////// Se guarda en localStorage despues de JSON stringificarlo 
//localStorage.setItem('myArray', JSON.stringify(array));

//console.log(JSON.parse(localStorage.getItem('myArray')));
function anadir() {
    if (localStorage.getItem('myArray') !== null) {
        let myArray = JSON.parse(localStorage.getItem('myArray'));
        let nombre = document.getElementById('nombre').value;
        let bandera = document.getElementById('bandera').value;
        myArray.push([bandera, nombre]);
        localStorage.setItem('myArray', JSON.stringify(myArray));
        llenarTabla();
    } else {
        let myArray = [];
        let nombre = document.getElementById('nombre').value;
        let bandera = document.getElementById('bandera').value;
        myArray.push([bandera, nombre]);
        localStorage.setItem('myArray', JSON.stringify(myArray));
        llenarTabla();
    }
    document.getElementById('nombre').value = '';
    document.getElementById('bandera').value = '';
};



window.addEventListener('load', () => {
    //llenarTabla()
    navBar()
});
