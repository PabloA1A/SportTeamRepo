//login
function check() {
    if (localStorage.getItem('nick') == null) {
        localStorage.setItem('nick', "admin");
        localStorage.setItem('password', 'admin');
    }
}

const nick = document.getElementById('nick')
const password = document.getElementById('password')

function logint() {
    console.log(localStorage.getItem('nick') === nick.value && localStorage.getItem('password') === password.value)
    if (localStorage.getItem('nick') == nick.value && localStorage.getItem('password') == password.value) {
        localStorage.setItem('login', 'true')
        return window.location.href = "http://127.0.0.1:5500/public/pages/team.html"
    } else
        alert("User or pasword incorect, tray again.")
}
//--

//navBar and footer
const nav = document.getElementById('nav')
const footer = document.getElementById('footer')

const home = '<a href="http://127.0.0.1:5500/index.html" class="active">Home</a>'
const login = '<a href="http://127.0.0.1:5500/public/pages/login.html">Login</a>'
const team = '<a href="http://127.0.0.1:5500/public/pages/team.html" hidden>Team</a>'
const ranking = '<a href="http://127.0.0.1:5500/public/pages/ranking.html" hidden>Ranking</a>'
const koPase = '<a href="" hidden>Ranking</a>'
const winner = '<a href="" hidden>Ranking</a>'
let navLink = ''

if (localStorage.getItem('login') == null) {
    localStorage.setItem('login', 'false');
}

if (localStorage.getItem('login') === 'false') {
    navLink = home + login
}
else {
    navLink = home + team
}
//condiciones para cuando empiece el partido

//--

// hacer un logout!!!!!!!!

let prefix = ''

if (localStorage.getItem('home') === 'false')
    prefix = '../'
else
    prefix = './public/'


function navBar() {
    nav.innerHTML = `
    <input type="checkbox" id="nav-check">
    <div class="nav-header">
        <span class="nav-img">
            <img src="${prefix}assets/img/logo.jpg" alt="logo baloncesto">
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
        <a href="https://www.facebook.com/?locale=es_ES"><img src="${prefix}assets/logos/icon-facebook.svg"
                alt="icono y link de faceboock"></a>
        <a href="https://www.instagram.com/accounts/login/"><img src="${prefix}assets/logos/icon-instagram.svg"
                alt="icono y link de instagram"></a>
        <a href="https://x.com/?lang=es"><img src="${prefix}assets/logos/icon-x.svg" alt="icono y link de x"></a>
        <a href="https://github.com/"><img src="${prefix}assets/logos/icon-github.svg"
                alt="icono y link de github"></a>
    </div>
    <a><img src="${prefix}assets/logos/icon-copyright.png" alt="icono de copyright"></a>
    `
};
//--



// page team
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
    check()
    navBar()
});





function redirigirBarajear() {
    let myArray = JSON.parse(localStorage.getItem('myArray'));
    if (validarCantidadEquipos(myArray)) {
        const bArray = barajarEquipos([...myArray]);
        localStorage.setItem('barajadoArray', JSON.stringify(bArray));
        const grupos = dividirEquiposEnGrupos(bArray); 
        localStorage.setItem('gruposArray', JSON.stringify(grupos)); 
        llenarTabla(bArray);
        window.location.href = "http://127.0.0.1:5500/public/pages/ranking.html"
    } else {
        alert('El número de equipos debe ser entre 16 y 32.');
    }
}

function validarCantidadEquipos(myArray) {
    let led = myArray.length
    if (myArray.length >= 16 && myArray.length <= 32)
        return true
    else return false
}

function barajarEquipos(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function dividirEquiposEnGrupos(array) {
    const barajadosArray = barajarEquipos([...array]);
    const numEquipos = barajadosArray.length;
    const numGrupos = Math.ceil(numEquipos / 4); 
    const grupos = [];

    for (let i = 0; i < numGrupos; i++) {
        grupos.push(barajadosArray.slice(i * 4, (i + 1) * 4));
    }

    return grupos; 
}

document.addEventListener('DOMContentLoaded', function () {
    const barajadoArray = JSON.parse(localStorage.getItem('barajadoArray'));

    if (barajadoArray && Array.isArray(barajadoArray)) {
        llenarTabla(barajadoArray);
    } else {
        alert('No se encontraron equipos barajados en localStorage.');
    }
});

function llenarTabla(equipos) {
    const tableBody = document.querySelector('#rankingTable');

    equipos.forEach((equipo, index) => {
        const row = document.createElement('tr');

        const cellPosicion = document.createElement('td');
        cellPosicion.textContent = equipo[0]
        row.appendChild(cellPosicion);

        const cellEquipo = document.createElement('td');
        cellEquipo.textContent = equipo[1];
        row.appendChild(cellEquipo);

        tableBody.appendChild(row);

    });
}