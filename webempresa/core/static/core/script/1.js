
'use strict';
//------------------Ingresando---a---elementos----------------------------


let bannerPosition = 0,
    productPosition = 0,
    indiceCarr = 562,
    bannerTime,
    productTime,
    areaNodeCopy = null,
    searchIndx = null,
    shoppInd = 0,
    inicioSesInd = 0,
    curretnPage = null,
    pages = ['home', 'pageOne', 'pageTwo', 'pageThree', 'pagUser'],
    usernames = new Map(),
    usuarioActivo,
    productos = new Map(),
    compras = new Map();


const getById = function (x) {
    return document.getElementById(x);
}
const getByClass = function (x) {
    return document.getElementsByClassName(x);
}

const valorFinal = function (x, i) {
    let sub, igv, total;
    sub = x * i;
    igv = sub * 0.18;
    total = sub + igv;
    return [sub, igv, total]
}

const navbar = getById('navbar'),
    header = getById('header'),
    section1 = getById('section--1'),
    section2 = getById('section--2'),
    section3 = getById('section--3'),
    main = getById('main'),
    sobreN = getById('sobre-nosotros');

class Usuario {
    constructor(nombreusuario, contraseña, email, nombres, sexo, edad, direccion, tarjeta, nivelComp) {
        this.nombreusuario = nombreusuario;
        this.contraseña = contraseña;
        this.email = email;
        this.nombres = nombres;
        this.sexo = sexo;
        this.edad = edad;
        this.direccion = direccion;
        this.tarjeta = tarjeta,
            this.nivelComp = nivelComp;
    }
    saludoUser() {
        return 'Bienvenido ' + this.nombres.split(/\s/);
    }
}

class Producto {
    constructor(codProd, detProd, precioProd, tipoProd, stockProd) {
        this.codProd = codProd;
        this.detProd = detProd;
        this.precioProd = precioProd;
        this.tipoProd = tipoProd;
        this.stockProd = stockProd;
    }
}

usernames.set('pab25', new Usuario('pab25', 'pablo123', 'pablo@noneus.com', 'Pablo Enriquez', 'M', '25', 'CA Gambilias 225 DPT 402 DIST San Martin CIU Lima PA Peru', '2554652125896432', 'Diamante'))
    .set('mar55', new Usuario('mar55', 'maria123', 'mar_ord@noneus.com', 'Maria Ordoñez', 'F', '30', 'AV Arequipa 1428 CAS DIST Miraflores CIU Lima PA Peru', '3456814593256741', 'Plata'));

productos.set('010101', new Producto('010101', 'Samsung LCD 21\' Full HD', 450, 'monitor', true))
    .set('010102', new Producto('010102', 'Samsung LED 24\' Full HD', 650, 'monitor', true))
    .set('010103', new Producto('010103', 'LG LED 24\' 4K', 1050, 'monitor', true))
    .set('010104', new Producto('010104', 'LG OLED 23.8\' 4K', 2200, 'monitor', true))
    .set('010105', new Producto('010105', 'ASUS LED 27\' Full HD', 2650, 'monitor', true))
    .set('010106', new Producto('010106', 'ASUS LED 27\' HDR', 2800, 'monitor', true))
    .set('010107', new Producto('010107', 'BENQ LED 28\' 4K HDR', 2900, 'monitor', true))
    .set('010108', new Producto('010108', 'BENQ LED 24\' Full HD', 1200, 'monitor', true));



//---------Almacenando---data---de--html---para---pasar---al---HTML-----------
const htmlItemBar = `
<div id="items-bar">
    <a class="item-link" href="#">Inicio</a>
    <a class="item-link" href="#">Producto</a>
    <a class="item-link" href="#">Tienda</a>
    <a class="item-link" href="#">Nosotros</a>
</div>`;
const htmlBanner = `
<div id="img-bann-cont">
<div>
<script href="{%  static 'core/script/1.js' %}"  rel="stylesheet"></script>
<script src="{%  static 'core/script/1.js' %}"  rel="stylesheet"></script>

    <img class="img-banner" src="{%  static 'core/img/c.jpg' %}" alt="">
</div>
<div>
    <img class="img-banner" src="{%  static 'core/img/c.jpg' %}" alt="">
</div>
<div>
    <img class="img-banner" src="{%  static 'core/img/c.jpg' %}" alt="">
</div>
<div>
    <img class="img-banner" src="{%  static 'core/img/c.jpg' %}" alt="">
</div>
</div>
<div id="button-banner">
    <i class="btn-banner fas fa-circle"></i>
    <i class="btn-banner fas fa-circle"></i>
    <i class="btn-banner fas fa-circle"></i>
    <i class="btn-banner fas fa-circle"></i>
</div>
<div id="text-content-banner">
    <h1 id="title-banner">VENTAS DE TECNOLOGIAS</h1>
    <p id="text-banner">Con la mejor tecnologia de PC, LAPTOP Y ACCESORIOS a la disposicion del cliente.</p>
    <button id="masinfo-banner">mas info</button>
</div>`;
const htmlProductos = `
<div id="sect-prod" class="container ">
    <div class="sec-1-prod">
        <div class="sec1-prod-cont">
        <img class="img-sec1" src="img/1.jpg" alt="">
        </div>
        <h3 class="tit-sec1">Repuestos</h3>
    </div>
    <div class="sec-1-prod">
        <div class="sec1-prod-cont">
        <img class="img-sec1" src="img/2.jpg" alt="">
        </div>
        <h3 class="tit-sec1">Gaming</h3>
    </div>
    <div class="sec-1-prod">
        <div class="sec1-prod-cont">
        <img class="img-sec1" src="img/3.jpg" alt="">
        </div>
        <h3 class="tit-sec1">Diseño</h3>
    </div>
    <div class="sec-1-prod">
        <div class="sec1-prod-cont">
        <img class="img-sec1" src="img/4.jpg" alt="">
        </div>
        <h3 class="tit-sec1">Led</h3>
    </div>
    <div class="sec-1-prod">
        <div class="sec1-prod-cont">
            <img class="img-sec1" src="img/5.jpg" alt="">
        </div>
        <h3 class="tit-sec1">Personales</h3>
    </div>
    <div class="sec-1-prod">
        <div class="sec1-prod-cont">
            <img class="img-sec1" src="img/b.jfif" alt="">
        </div>
        <h3 class="tit-sec1">Titulo area</h3>
    </div>
    <div class="sec-1-prod">
        <div class="sec1-prod-cont">
            <img class="img-sec1" src="img/b.jfif" alt="">
        </div>
        <h3 class="tit-sec1">Titulo area</h3>
    </div>
</div>
<div id="bar-status-slider">
    <div id="line-status"></div>
    <div id="circle-status"></div>
</div>`;
const htmlAreas = `
<div id="sect-area" class="container ">
    <div class="area-container">
    <div class="img-area-container">
        <img class="img-area" src="img/comp1.jpg" alt="">
    </div>
    <div class="text-area-cont">
        <h3>All in One IPS Full HD 27”</h3>
        <p>Windows 10 Home</p>
        <p>Disco Duro 1TB</p>
        <p>Memoria RAM: 16 GB</p>

    </div>
    </div>

    <div class="area-container">
    <div class="img-area-container">
        <img class="img-area" src="img/comp2.jpg" alt="">
    </div>
    <div class="text-area-cont">
        <h3>All in One IPS Full HD 23.8” Ci5</h3>
        <p>Windows 10 Home</p>
        <p>Procesador Intel Core i5 10ma Generación</p>
        <p>Disco duro de 1TB</p>
        
    </div>
    </div>
    <div class="area-container">
    <div class="img-area-container">
        <img class="img-area" src="img/comp3.jpg" alt="">
    </div>
    <div class="text-area-cont">
        <h3>All in One IPS Full HD 23.8” Ci3</h3>
        <p>Windows 10 Home</p>
        <p>Procesador Intel Core i3 10ma Generación</p>
        <p>Disco duro de 500 GB</p>

    </div>
    </div>
    <div class="area-container">
    <div class="img-area-container">
        <img class="img-area" src="img/comp4.jpg" alt="">
    </div>
    <div class="text-area-cont">
        <h3>All in One IPS Full HD 21.5"</h3>
        <p>Windows 10 Home / Windows 10 Pro (64bit)</p>
        <p>Calidad</p>
        <p>Pantalla IPS</p>

    </div>
    </div>
    <div class="area-container">
    <div class="img-area-container">
        <img class="img-area" src="img/comp5.jpg" alt="">
    </div>
    <div class="text-area-cont">
        <h3>HP LAPTOP 15-DW1085LA 15.6" CORE I3 256GB 4GB</h3>
        <p>Diseñada para tu productividad y entretenimiento.</p>

    </div>
    </div>
    <div class="area-container">
    <div class="img-area-container">
        <img class="img-area" src="img/comp6.jpg" alt="">
    </div>
    <div class="text-area-cont">
        <h3>ASUS LAPTOP VIVOBOOK 15.6" X512JF CORE I5 512GB 8GB 2GB + 32GB OPTANE</h3>
        <p>La ASUS VivoBook 15 aumenta la sensación de inmersión.</p>
    </div>
    </div>`;
const htmlFormUser = `
    <div id='blur'></div>
    <form id="user-registro" name="regform" onsubmit="form(this)" action="">
        <i id='closeForm' class="fas fa-times"></i>
        <i id="user-form" class="fas fa-user"></i> <br>
        <label for="username-reg">Nombre de usuario</label><br>
        <input type="text" name="usernamereg" id="username-reg" ><br><br>
        <label for="name-user-reg">Nombres y apellidos</label><br>
        <input type="text" name="nameuserreg" id="name-user-reg" ><br><br>
        <label for="email-reg">Correo Electronico</label><br>
        <input type="email" name="emailreg" id="email-reg" ><br><br>
        <label for="password-reg">Contraseña</label><br>
        <input type="password" name="passwordreg" id="password-reg"><br><br>
        <label id="sexo-label" for="sexoreg">Sexo</label>
        <input type="radio" name="sexoreg" id="masc-reg">
        <label for="masc-reg">M</label>
        <input type="radio" name="sexoreg" id="fem-reg">
        <label for="fem-reg">F</label>
        <input type="radio" name="sexoreg" id="otro-reg">
        <label for="otro-reg">Otro</label><br><br>
        <input id="submit-reg" type="submit" value="Registrarse">
    </form>`;

const htmlTienda = `<div id='store-cont'>
<i id='closeStore' class="fas fa-times"></i>
    <table id="tabla-prod">
        <tr id="titulo-producto">
            <th>Productos</th>
            <th>Unidades</th>
            <th>Precio</th>
        </tr>
        

        <tr id="totales">
            <th colspan="2">Total</th>
            <th></th>
        </tr>
    </table>
</div>`;

const htmlInicioSesion = `<div id='inicio-sesion'>
<i id='closeIniSes' class="fas fa-times"></i>
<table id="tabla-inicio">
    <tr>
        <th colspan="2">
            <p>Inicio Sesion</p>
        </th>
    </tr>
    <tr id="">
        <td><label for="inicio-usu">Usuario</label></td>
        <td><input type="text" name="inicio-usu" id="inicio-usu"></td>
    </tr>
    <tr id="">
        <td><label for="inicio-pass">Contraseña</label></td>
        <td><input type="password" name="inicio-pass" id="inicio-pass"></td>
    </tr>
    <tr>
        <td colspan="2">
            <a id="inicio-reg" href="">Registrarse</a>
        </td>
    </tr>
    <tr>
        <td colspan="2"><input id="inicio-acept" type="submit" value="Aceptar"></td>
    </tr>
</table>
</div>`;

const htmlSesIniciada = `
<i id='closeIniSes2' class="fas fa-times"></i>
<img id="imgIniSes" src="img/user.svg" alt="">
<h4 id="bienvenida">Bienvenido <span>user</span></h4>
<div id="info-inises">
    <p>Información</p>
    <p>AV Juan Luis 519</p>
    <h4>*********5212</h4>
</div>
<input id="btn-pagusu" type="submit" value="Más info">
</div>`;

const htmlOptions = `










<div id="cont1">
    <div class="container cont-opcion">
        <ul>
            <a class="opcionLeft" href="#">Opciones</a>
            <li>
                <a href="#">Opcion</a>
            </li>
            <li>
                <a href="#">Opcion</a>
            </li>
            <li>
                <a href="#">Opcion</a>
            </li>
        </ul>
    </div>
    <div class="container cont-opcion">
        <ul>
            <a class="opcionLeft" href="#">Opciones</a>
            <li>
                <a href="#">Opcion</a>
            </li>
            <li>
                <a href="#">Opcion</a>
            </li>
            <li>
                <a href="#">Opcion</a>
            </li>
        </ul>
    </div>
    <div class="container cont-opcion">
        <ul>
            <a class="opcionLeft" href="#">Opciones</a>
            <li>
                <a href="#">Opcion</a>
            </li>
            <li>
                <a href="#">Opcion</a>
            </li>
            <li>
                <a href="#">Opcion</a>
            </li>
        </ul>
    </div>

</div>
</div>`;


const htmltopPageONe = `
<div id="cont2">
    <table>
        <tr>
            <td>
                <label for="ordenar">Ordenar por:</label>
                <select id="ordenar">
                    <option>Seleciona</option>
                    <option value="az">A - Z</option>
                    <option value="za">Z - A</option>
                    <option value="menor">Precio menor</option>
                    <option value="mayor">Precio mayor</option>
                </select>

            </td>
            <td>
                <label for=""></label>
                <input type="checkbox" name="montoPrecio" id="men500" value="men500"> <label for="men500">S/.15 - S/.500</label>
                <input type="checkbox" name="montoPrecio" id="men1000" value="men1000"> <label for="men1000">S/.501 - S/.1000</label>
                <input type="checkbox" name="montoPrecio" id="mas1000" value="mas1000"> <label for="mas1000">S/.1000 a más</label> </td>

        </tr>
    </table>
</div>`;

const htmlContPOne = `
<section id="cont3" class="container">
    <div class="cont-tienda">
        <img src="img/samsung1.jpg" alt="">
        <p>Samsung LCD 21</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
    <div class="cont-tienda">
        <img src="img/samgung2.jfif" alt="">
        <p>Samsung LED 24</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
    <div class="cont-tienda">
        <img src="img/lg1.jpg" alt="">
        <p>LG LED 24</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
    <div class="cont-tienda">
        <img src="img/lg2.webp" alt="">
        <p>LG OLED 23.8</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
    <div class="cont-tienda">
        <img src="img/asus1.jfif" alt="">
        <p>ASUS LED 27</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
    <div class="cont-tienda">
        <img src="img/asus2.jfif" alt="">
        <p>ASUS LED 27</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
    <div class="cont-tienda">
        <img src="img/benq1.jfif" alt="">
        <p>BENQ LED 28</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
    <div class="cont-tienda">
        <img src="img/benq2.jfif" alt="">
        <p>BENQ LED 24</p>
        <i class="mas-prod far fa-plus-square"></i>
    </div>
</section>`;

const htmlPageUserHeader = `
<div id="userHeader">
<img id="userPageImg" src="img/user.jpg" alt="">
<table id="userContHeader">
    <tr>
        <td>Nombre</td>
        <td>Edad</td>
        <td><input type="button" value="Editar"></td>
    </tr>
    <tr>
        <td>Dirección</td>
        <td>Favoritos</td>
        <td>Nivel Comprador</td>
    </tr>
</table>

</div>
`;

const htmlPageUserCont = `    
<div id="userPagCont">
<div id="userCupon">
    <div id="cuponInfo" class="u-cont-ext">
        <h4>Cupones ganados</h4>
        <h4>1 Activos</h4>
        <h4>0 por vencer</h4>
        <h4>Detalle</h4>
        <i id="detFav" class="fas fa-caret-down"></i>
    </div>
    <div class="u-cont">
        <div class="cupon u-cont-int">
            <h4>Cupon</h4>
            <h4>N° 025482</h4>
            <h4>Detalle del Cupon</h4>
            <input id="descuento-btn" type="button" value="usar">
        </div>
    </div>
</div>
<div class="userProdFav">
    <div class="prod-Info u-cont-ext">
        <i class="far fa-star"></i>
        <i class="fas fa-star"></i>
        <h4>Producto</h4>
        <h4>Fecha</h4>
        <h4>Precio</h4>
        <div class="img-fav-mini">
            <img src="img/b.jfif" alt="">
        </div>
        <i class="fas fa-caret-down"></i>
    </div>
    <div class="u-cont">
        <div class="prodFav u-cont-int">
            <i class="fas fa-caret-left"></i>
            <div class="img-fav-detall">
                <img src="img/b.jfif" alt="">
            </div>
            <i class="fas fa-caret-right"></i>
            <p>
                Una descripción breve sobre el producto
            </p>
            <table class="prodFav-precio">
                <tr>
                    <th>
                        Subtotal
                    </th>
                    <td class="subtotal-fav">
                        10.0
                    </td>
                </tr>
                <tr>
                    <th>
                        I.G.V.
                    </th>
                    <td class="igv-fav">
                        1.8
                    </td>
                </tr>
                <tr>
                    <th>
                        Total
                    </th>
                    <td class="total-fav">
                        11.8
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
<div id="userCompras">
    <div id="userComp-info" class="u-cont-ext">
        <h4>Compras realizadas <span>15</span></h4>
        <h4>Faltan <span>3</span></h4>
        <h4>Nivel Silver</h4>
        <h4>Detalle</h4>
        <i class="fas fa-caret-down"></i>
    </div>
    <div class="u-cont">
        <div class="userCompra">
            <div class="u-cont-int">
                <h4>N° 002-025482</h4>
                <h4>Tarjeta <span id="userCompraTarj"></span></h4>
                <h4>19/02/2020</h4>
                <i class="fas fa-caret-down"></i>
                <h4>Total <span>49.5</span></h4>
            </div>
        </div>

        <div class="userCompra">
            <div class="u-cont-int">
                <h4>N° 002-025482</h4>
                <h4>Tarjeta <span id="userCompraTarj"></span></h4>
                <h4>19/02/2020</h4>
                <i class="fas fa-caret-down"></i>
                <h4>Total <span>49.5</span></h4>
            </div>
            <div class="u-cont">
                <table class="userCompraDet">
                    <tr>
                        <th>
                            Producto
                        </th>
                        <th>
                            P/U
                        </th>
                        <th>
                            Cant
                        </th>
                        <th>
                            Subtotal
                        </th>
                        <th>
                            I.G.V.
                        </th>
                        <th>
                            Total
                        </th>
                    </tr>
                    <tr>
                        <td>
                            Descripcion
                        </td>
                        <td>
                            20.0
                        </td>
                        <td>
                            3
                        </td>
                        <td>
                            60.0
                        </td>
                        <td>
                            10.8
                        </td>
                        <td>
                            70.8
                        </td>
                    </tr>
                </table>
            </div>

        </div>
    </div>
</div>
</div>
`;

const htmlTiendaPag = `
<div id='store-fondo' ></div>
<div id="tienda-cont">    
    <div id="tienda-detalle">
        
    </div>
    <div id="payfast">
        <div id="close-payfast">
            <i class="fas fa-angle-left"></i>
        </div>
        <div>
        <h2>PayFast</h2>
        <hr>
        <table>
        </table>

        <hr>
        <h3>Método de pago</h3>
        <input type="radio" name="metod-pag" id="visa">
        <label for="visa">VISA</label>
        <input type="radio" name="metod-pag" id="master">
        <label for="master">Master</label> <br>
        <input type="radio" name="metod-pag" id="paypal">
        <label for="paypal">PayPal</label>
        <input type="radio" name="metod-pag" id="bitcoin">
        <label for="bitcoin">Bitcoin</label>
        <input type="button" value="Ingresar Datos">
        <hr>
        <h3>Total <span>S/.0</span></h3>
        <label for="term-cond">Términos y condiciones</label>
        <input type="checkbox" name="term-cond" id="term-cond">
        <hr>
        <input type="button" value="Pagar">
        </div>
    </div>

</div>`;

const htmlSobreNosotros = `

<div id="sobre-nosotros">
<div id="header-ban" class="ban-us"></div>

<div id="ban-1" class="ban-us"></div>

<div id="ban-2" class="ban-us"></div>

<div id="ban-3" class="ban-us"></div>

<div id="ban-4" class="ban-us"></div>

<h1>Conócenos</h1>

<h4>Desde 2015 sirviendo a personas como tú</h4>

<div id="videos">
    <iframe id="videopuntualidad" width="560" height="315" src="https://www.youtube.com/embed/cks6r0Oewp8?start=11" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe id="videoconfianza" width="560" height="315" src="https://www.youtube.com/embed/doR3s0bNB4o?start=11" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe id="videocalidad" width="560" height="315" src="https://www.youtube.com/embed/uNLBnSLsYEI?start=11" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe id="videodedicacion" width="560" height="315" src="https://www.youtube.com/embed/vdYtjK_BOM4?start=11" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>    
</div>

<h3><span>Dedicación</span><br><span>Confiaza</span></h3>
<h3><span>Puntualidad</span><br><span>Calidad</span></h3>

    <h2>Nuestros diseñadores</h2>
    <figure>
        <div><img src="img/p1.jfif" alt=""></div>
        <figcaption>Johan</figcaption>
    </figure>
    <figure>
        <div><img src="img/p2.jfif" alt=""></div>
        <figcaption>Zumaran Romero Benjamin</figcaption>
    </figure>
    <figure>
        <div><img src="img/p3.jfif" alt=""></div>
        <figcaption>Miguel</figcaption>
    </figure>

<h1>¡Muchas gracias!</h1>

<div id="program-social">
    <div>
        <a href="mailto:example@example.com" class="social-link" target="_blank">
            <i class="fas fa-at"></i>
            <span>Envía un email</span>
            <span>966711473</span>
        </a><br>
        <a href="mailto:example@example.com" class="social-link" target="_blank">
            <i class="fas fa-at"></i>
            <span>Envía un email</span>
            <span>966711473</span>
        </a>
        <a href="mailto:example@example.com" class="social-link" target="_blank">
            <i class="fas fa-at"></i>
            <span>Envía un email</span>
            <span>benzum566@gmail.com</span>
        </a>
    </div>
    <div>
        <a href="tel:555-555-5555" class="social-link" target="_blank">
            <i class="fas fa-mobile-alt"></i>
            <span>Llámanos</span>
            <span>966711473</span>
        </a>
        <a href="tel:555-555-5555" class="social-link" target="_blank">
            <i class="fas fa-mobile-alt"></i>
            <span>Llámanos</span>
            <span>966711473</span>
        </a><br>
        <a href="tel:555-555-5555" class="social-link" target="_blank">
            <i class="fas fa-mobile-alt"></i>
            <span>Llámanos</span>
            <span>966711473</span>
        </a>

    </div>
</div>
</div>`;

//--------------------------TOP--BAR--------------------------


main.insertAdjacentHTML("beforeend", htmlFormUser);
main.insertAdjacentHTML("beforeend", htmlTienda);
main.insertAdjacentHTML("beforeend", htmlInicioSesion);
navbar.insertAdjacentHTML("beforeend", htmlItemBar);

const homeButton = document.querySelector('.fa-home'),
    searchButton = document.querySelector('.fa-search'),
    userButton = document.querySelector('.fa-user'),
    shoppingButton = document.querySelector('.fa-shopping-cart'),
    formCloseButton = getById('closeForm'),
    storeCloseButton = getById('closeStore'),
    iniSesCloseButton = getById('closeIniSes'),
    inputSearch = getById('search'),
    formUser = getById('user-registro'),
    blurDiv = getById('blur'),
    storeCont = getById('store-cont'),
    inicioSesCont = getById('inicio-sesion'),
    itemButton = Array.from(getByClass('item-link')),
    iniciarSesBtn = getById('inicio-acept'),
    totalBarVenta = getById('totales'),
    itemProd = getByClass('producto'),
    footer = getById('footer'),
    barraItem = getById('items-bar'),
    title = getById('title');


//---------------------------FORM-----------------------
const formReg = getById('inicio-reg'),
    uNameLabelReg = getById('username-reg'),
    passLabelReg = getById('password-reg'),
    emailLabelReg = getById('email-reg'),
    nameULabelReg = getById('name-user-reg'),
    sexoRadio = document.getElementsByName('sexoreg'),
    inicioUsu = getById('inicio-usu'),
    inicioPass = getById('inicio-pass'),
    submitReg = getById('submit-reg');

//----------------------VALIDACION------------------------

iniciarSesBtn.onclick = function () {
    let iniUsu = inicioUsu.value,
        iniPass = inicioPass.value;
    console.log(iniUsu, iniPass);
    const user = usernames.get(iniUsu);
    if (user) {
        if (user.contraseña === iniPass) {
            inicioUsu.value = '';
            inicioPass.value = '';
            inicioSesCont.innerHTML = '';
            inicioSesCont.insertAdjacentHTML('afterbegin', htmlSesIniciada);
            inicioSesCont.querySelector('#bienvenida').textContent = 'Buenas, ' + user.nombres.split(' ')[0];
            inicioSesCont.getElementsByTagName('p')[1].textContent = user.direccion.split(' ').slice(0, 3).join(' ');
            inicioSesCont.getElementsByTagName('h4')[1].textContent = user.tarjeta.slice(-4).padStart(16, '*');
            getById('closeIniSes2').onclick = openIniSes;
            usuarioActivo = user;
            if (curretnPage === 'pagUser') {
                const userInfo = getById('userContHeader').getElementsByTagName('tr')[1].getElementsByTagName('td');
                userInfo[0].innerHTML = usuarioActivo.nombres;
                userInfo[1].innerHTML = usuarioActivo.edad;
                userInfo[2].innerHTML = 'Nivel ' + usuarioActivo.nivelComp;
            }
            const pagUsuario = getById('btn-pagusu');
            pagUsuario.onclick = e => {
                if (curretnPage !== 'pageUser') {
                    pageUser();
                }
            }
        } else {

            inicioUsu.value = '';
            inicioPass.value = '';
        }
    } else {
        inicioUsu.value = '';
        inicioPass.value = '';
    }

}

//-----------------------TOP-BAR--FUNCTIONS--------------------

const closeandclearReg = e => {
    document.body.style.overflow = 'scroll';
    blurDiv.style.display = 'none';
    formUser.style.display = 'none';
    uNameLabelReg.value = '';
    passLabelReg.value = '';
    emailLabelReg.value = '';
    nameULabelReg.value = '';
    if (areaNodeCopy !== null) (areaNodeCopy.style.display = 'none', areaNodeCopy = null);
}

const openReg = e => {
    inicioSesCont.style.display = 'none';
    inicioSesInd = 0;
    blurDiv.style.display = 'block';
    formUser.style.display = 'block';
    storeCont.style.display = 'none';
    document.body.style.overflow = 'hidden';
}
const openIniSes = e => {
    if (inicioSesInd === 0) {
        storeCont.style.display = 'none';
        shoppInd = 0;
        inicioSesCont.style.display = 'block';
        inicioSesInd++;
    } else {
        inicioSesCont.style.display = 'none';
        inicioSesInd = 0;
    }
}
const buttonOver = (e, s) => {
    e.style.textShadow = 'var(--text-shadow)';
    e.style.fontSize = `${s}rem`;
    e.style.transition = '0.4s';
}

const buttonOut = (e, s) => {
    e.style.textShadow = 'none';
    e.style.fontSize = `${s}rem`;
}

const searchShow = () => {
    searchButton.classList.add('search-open');
    inputSearch.style.opacity = '1';
    inputSearch.style.transition = '1s';
}

const searchHide = () => {
    searchButton.classList.remove('search-open');
    inputSearch.style.transition = '0.2s';
    inputSearch.style.opacity = '0';
    inputSearch.value = '';
}

const shoowShop = () => {
    if (shoppInd === 0) {
        inicioSesCont.style.display = 'none';
        inicioSesInd = 0;
        storeCont.style.display = 'block';
        shoppInd++;
    } else {
        storeCont.style.display = 'none';
        shoppInd = 0;
    }
}

userButton.onmousedown = e => buttonOver(userButton, 1.45);
userButton.onmouseup = e => buttonOut(userButton, 1.5);

searchButton.onmousedown = e => buttonOver(searchButton, 1.1);
searchButton.onmouseup = e => buttonOut(searchButton, 1.15);

searchButton.onclick = e => {
    return searchIndx === 0 ? (searchShow(), searchIndx++) : (searchHide(), searchIndx = 0);
}

shoppingButton.onmousedown = e => buttonOver(shoppingButton, 1.45);
shoppingButton.onmouseup = e => buttonOut(shoppingButton, 1.5);
shoppingButton.onclick = shoowShop;
storeCloseButton.onclick = shoowShop;

homeButton.onmousedown = e => buttonOver(homeButton, 1.75);
homeButton.onmouseup = e => buttonOut(homeButton, 1.8);

userButton.onclick = openIniSes;
iniSesCloseButton.onclick = openIniSes;

formReg.onclick = e => {
    e.preventDefault();
    openReg();
};

formCloseButton.onclick = closeandclearReg;
blurDiv.onclick = closeandclearReg;

function form(x) {
    let nomUsu = x.usernamereg.value,
        nombres = x.nameuserreg.value,
        email = x.emailreg.value,
        contr = x.passwordreg.value,
        rgx = /^\w{3,10}$/;

    if (!rgx.test(nomUsu) || usernames.has(nomUsu)) {
        window.event.preventDefault();
        return alert('Intenta con otro usuario');

    }
    rgx = /^[a-zA-Z]{4,}$/;
    if (!rgx.test(nombres)) {
        window.event.preventDefault();
        return alert('Nombre necesario(min 4 caracteres)');
    }
    rgx = /^\w+[@]\w+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3})*$/;
    if (!rgx.test(email)) {
        window.event.preventDefault();
        return alert('Email inválido');
    }
    rgx = /^\w{5,}$/;
    if (!rgx.test(contr)) {
        window.event.preventDefault();
        return alert('Contraseña mínimo de 5 caracteres');
    }

    return alert('Información ingresada, correctamente');

}



//---------------------Insertando--HTML------------------------
function pageHome() {
    curretnPage = pages[0];
    header.innerHTML = '';
    section1.innerHTML = '';
    section2.innerHTML = '';
    if (sobreN) sobreN.innerHTML = '';
    footer.style.display = 'block';
    header.insertAdjacentHTML("afterbegin", htmlBanner);

    const bannerImgCont = getById('img-bann-cont'),
        masInfoButton = getById('masinfo-banner'),
        buttonBann = Array.from(getByClass('btn-banner'));


    //--------------------Scrolling-----------------------------------

    masInfoButton.addEventListener('click', x => {
        section1.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    masInfoButton.onmousedown = function () {
        this.classList.add('shadow');
        this.style.width = '6.8rem';
        this.style.height = '1.6rem';
        this.style.fontSize = '1rem';
    }
    masInfoButton.onmouseup = function () {
        this.classList.remove('shadow');
        this.style.width = '7rem'
        this.style.height = '1.8rem'
        this.style.fontSize = '1.05rem';
    }


    //---------------------Banner---Carrusel-------------------------------
    function bannerCarrusel() {
        bannerPosition += 100;
        if (bannerPosition >= 400) bannerPosition = 0;
        bannerImgCont.setAttribute('style', 'position:relative;right:' + bannerPosition + '%;transition:1s');
    }
    bannerCarrusel();
    bannerTime = setInterval(bannerCarrusel, 4000);

    buttonBann.forEach((e, i) => {
        e.addEventListener('click', x => {
            bannerPosition = (i) * 100;
            bannerImgCont.setAttribute('style', 'position:relative;right:' + bannerPosition + '%;transition:1s');

        });
        e.onmousedown = x => buttonOver(e, 0.94);

        e.onmouseup = x => buttonOut(e, 1);
    })

    section1.insertAdjacentHTML("afterbegin", htmlProductos);

    const prodcCont = getById('sect-prod'),
        prodImgCont = Array.from(getByClass('sec-1-prod')),
        barStatusCont = getById('bar-status-slider'),
        circleStatus = getById('circle-status'),
        lineStatus = getById('line-status');


    //-----------------------carrusel---Producto-----------------------------
    function productCarrusel() {
        if (productPosition === 0) {
            productPosition = indiceCarr * 1.975;
            prodcCont.setAttribute('style', 'right:' + productPosition + 'px;');
            circleStatus.setAttribute('style', `left:${lineStatus.scrollWidth}px;`);

        } else {
            prodcCont.setAttribute('style', 'right:0;');
            circleStatus.setAttribute('style', `left:0;`);
            productPosition = 0;
        }
    }
    productCarrusel();
    productTime = setInterval(productCarrusel, 6000);
    console.log(document.getElementById('line-status').scrollWidth);


    console.log(prodcCont.offsetWidth)
    prodImgCont.forEach(e => {
        e.addEventListener('mouseover', x => {
            e.querySelector('.sec1-prod-cont').classList.add('shadow');
            e.querySelector('.sec1-prod-cont').setAttribute('style', 'transition:1s')
            e.setAttribute('style', 'width:17rem;transition:1s')
        });
        e.addEventListener('mouseout', x => {
            e.querySelector('.sec1-prod-cont').classList.remove('shadow');
            e.setAttribute('style', 'width:18rem;transition:1s')
        });
    });

    section2.insertAdjacentHTML("afterbegin", htmlAreas);

    const areaCont = getById('sect-area'),
        areaItemCont = Array.from(getByClass('area-container'));



    //----------------------Area-------------------------

    areaItemCont.forEach(e => {
        e.addEventListener('mouseover', x => {
            e.querySelector('.img-area-container').classList.add('shadow', 'transition');
            e.setAttribute('style', 'width:17rem;height:23rem;transition:1s');
        });
        e.addEventListener('mouseout', x => {
            e.querySelector('.img-area-container').classList.remove('shadow');
            e.setAttribute('style', 'width:16rem;height:22rem;transition:1s');
        });

        e.onclick = x => {
            inicioSesCont.style.display = 'none';
            inicioSesInd = 0;
            storeCont.style.display = 'none';
            shoppInd = 0;
            const y = e.querySelector('.img-area-container').cloneNode(true),
                z = e.querySelector('.text-area-cont').cloneNode(true);
            areaNodeCopy = document.createElement('div');
            areaNodeCopy.style.height = '16rem';
            areaNodeCopy.style.width = '45rem';
            areaNodeCopy.style.padding = '5rem 5rem';
            areaNodeCopy.style.position = 'fixed';
            areaNodeCopy.style.top = '20%';
            areaNodeCopy.style.left = '20%';
            areaNodeCopy.style.zIndex = '1';
            areaNodeCopy.style.borderRadius = '2.5rem';
            areaNodeCopy.style.backgroundColor = 'rgb(238, 238, 238)';
            y.style.position = "relative";
            y.style.bottom = '1rem';
            y.style.right = '1rem';
            y.style.width = "20rem";
            y.style.height = "18rem";
            y.style.float = "left";
            z.style.float = "right";
            z.style.position = "relative";
            z.style.bottom = '1.8rem';
            z.style.left = '1rem';
            z.style.width = "24rem";
            z.style.color = 'aliceblue';
            z.style.margin = ' 0';
            z.style.fontSize = '1.5rem';
            areaNodeCopy.appendChild(y);
            areaNodeCopy.appendChild(z);
            document.body.appendChild(areaNodeCopy);
            blurDiv.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

    });

}


// -----------------------Page--------One-------------------

function pageONE() {
    curretnPage = pages[1];
    header.innerHTML = '';
    section1.innerHTML = '';
    section2.innerHTML = '';
    if (sobreN) sobreN.innerHTML = '';
    footer.style.display = 'block';
    header.insertAdjacentHTML('beforeend', htmltopPageONe);
    header.insertAdjacentHTML('beforeend', htmlOptions);
    section1.insertAdjacentHTML('afterbegin', htmlContPOne);

    const opDisp = getByClass('cont-opcion'),
        contProd = Array.from(getByClass('cont-tienda')),
        addButton = Array.from(getByClass('mas-prod'));

    contProd[0].setAttribute('data-codprod', '010101');
    contProd[1].setAttribute('data-codprod', '010102');
    contProd[2].setAttribute('data-codprod', '010103');
    contProd[3].setAttribute('data-codprod', '010104');
    contProd[4].setAttribute('data-codprod', '010105');
    contProd[5].setAttribute('data-codprod', '010106');
    contProd[6].setAttribute('data-codprod', '010107');
    contProd[7].setAttribute('data-codprod', '010108');

    for (const e of opDisp) {
        e.onclick = x => {
            e.querySelectorAll('li').forEach(y => {
                // y.style.display = 'block';
                if (y.classList.contains('blok')) y.classList.remove('blok');
                else y.classList.add('blok');
            })

        }

    }
    contProd.forEach(function (e) {
        e.onmouseover = function () {
            e.querySelector('p').style.display = 'block';
        }
        e.onmouseout = function () {
            e.querySelector('p').style.display = 'none';
        }
    });

    function addingProd() {
        let producto = productos.get(this.parentNode.getAttribute('data-codprod')),
            nProd = 0,
            total = 0;
        if (compras.has(producto.codProd)) {
            nProd = compras.get(producto.codProd)[0] + 1;
            compras.set(producto.codProd, [nProd, producto.precioProd]);
            const prodCambio = document.getElementById('tabla-prod').getElementsByClassName(producto.codProd)[0].getElementsByTagName('td');
            const precio = valorFinal(producto.precioProd, nProd)
            prodCambio[1].textContent = nProd;
            prodCambio[2].textContent = 'S/.' + precio[2];
        } else {
            nProd++;
            compras.set(producto.codProd, [nProd, producto.precioProd]);
            const precio = valorFinal(producto.precioProd, nProd)
            const htmlProd = `
        <tr  class="producto ${producto.codProd}"  data-codprod="${producto.codProd}" data-un="${nProd}">
            <td>${producto.detProd}</td>
            <td>${nProd}</td>
            <td>S/.${precio[2]}</td>
        </tr>`;
            totalBarVenta.insertAdjacentHTML('beforebegin', htmlProd);
        }
        if (shoppInd === 0) shoowShop();
        console.log(compras);
        compras.forEach(e => {
            total += valorFinal(e[0], e[1])[2];
        })
        totalBarVenta.getElementsByTagName('th')[1].textContent = `S/.${total}`;
    }

    addButton.forEach(function (e) {
        e.onclick = addingProd;
    });






}

// -----------Page----Two------------


function pageUser() {
    curretnPage = pages[4];
    header.innerHTML = '';
    section1.innerHTML = '';
    section2.innerHTML = '';
    if (sobreN) sobreN.innerHTML = '';

    header.insertAdjacentHTML('beforeend', htmlPageUserHeader);
    section2.insertAdjacentHTML('beforeend', htmlPageUserCont);
    footer.style.display = 'none';

    const userInfo = getById('userContHeader').getElementsByTagName('tr')[1].getElementsByTagName('td'),
        cuponCont = getById('userCupon'),
        cupon = getByClass('cupon'),
        prodFavCont = getByClass('userProdFav'),
        prodFav = getByClass('prodFav'),
        userCompras = getById('userCompras'),
        userCompra = getByClass('userCompra'),
        compraDetalle = getByClass('userCompraDet');

    if (usuarioActivo != null) {
        userInfo[0].innerHTML = usuarioActivo.nombres;
        userInfo[1].innerHTML = usuarioActivo.edad;
        userInfo[2].innerHTML = 'Nivel ' + usuarioActivo.nivelComp;
    }


    const getMasDet = function (x) {
        return x.getElementsByTagName('div')[0].getElementsByTagName('i')[0];
    }

    const cuponBtnDet = getMasDet(cuponCont),
        comprasBtnDet = getMasDet(userCompras);

    cuponBtnDet.onclick = e => {
        const classList = cuponCont.getElementsByTagName('div')[1].classList
        if (classList.contains('flex')) classList.remove('flex');
        else classList.add('flex');
    }

    comprasBtnDet.onclick = e => {
        const classList = userCompras.getElementsByTagName('div')[1].classList
        if (classList.contains('flex')) classList.remove('flex');
        else classList.add('flex');
    }


    for (const e of prodFavCont) {
        const btn = e.getElementsByTagName('div')[0].getElementsByTagName('i')[2];
        btn.onclick = i => {
            const classList = e.getElementsByTagName('div')[2].classList
            if (classList.contains('flex')) classList.remove('flex');
            else classList.add('flex');
        }
    }


}


// -----------Page-----Two------


function pageTWO() {
    curretnPage = pages[2];
    header.innerHTML = '';
    section1.innerHTML = '';
    section2.innerHTML = '';
    if (sobreN) sobreN.innerHTML = '';

    section1.insertAdjacentHTML('afterbegin', htmlTiendaPag);

    const tiendaCon = getById('tienda-cont'),
        detalleTienda = getById('tienda-detalle');

    let detalleProd = getByClass('ventaProd'),
        payfast = getById('payfast');

    getById('close-payfast').onclick = e => {
        const classList = tiendaCon.classList;
        if (classList.contains('gridCover')) {
            classList.remove('gridCover');
        } else {
            classList.add('gridCover');
        }
    }



    // -------------------Productos----------------------------------


    const llaves = Array.from(compras.entries());
    console.log(llaves)
    llaves.forEach(e => {

        let total = valorFinal(e[1][1], e[1][0]);
        const htmlNuevaCompra = `
            <div class="ventaProd ${e[0]}">
            <div class="venta-Info u-cont-ext">
                <h4>${productos.get(e[0]).detProd}</h4>
                <h4>S/.${total[2]}</h4>
                <h4>${e[1][0]} un</h4>
                <i class="fas fa-caret-down"></i>
            </div>
            <div class="u-cont venta-det">
                <div>
                    <h3>Detalle Producto</h3>
                    <p>
                        Una descripción breve sobre el producto
                    </p>
                </div>
                <table class="">
                    <tr>
                        <th>
                            Subtotal
                        </th>
                        <td class="">
                        S/.${total[0]}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            I.G.V.
                        </th>
                        <td class="">
                        S/.${total[1]}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Total
                        </th>
                        <td class="">
                        S/.${total[2]}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input type="button" value="Eliminar">
                        </td>
                    </tr>
                </table>
            </div>
        </div>`,
            htmlProdPay = `
            <tr class='${e[0]}'>
                <td>
                    <h4>
                    ${productos.get(e[0]).detProd.slice(0, 10)}
                    </h4>
                </td>
                <td>
                    <h4>
                        S/.${total[2]}
                        <i class="fas fa-trash"></i>
                    </h4>

                </td>
            </tr>`;

        payfast.getElementsByTagName('table')[0].insertAdjacentHTML('beforeend', htmlProdPay);
        detalleTienda.insertAdjacentHTML('beforeend', htmlNuevaCompra);
    });

    payfast.querySelectorAll('tr').forEach(e => {
        e.getElementsByTagName('i')[0].onclick = x => {
            let total = 0;
            const numClass = e.classList.value;
            for (const y of getByClass(numClass)) {
                y.remove();
            }
            e.remove();
            compras.delete(numClass);
            console.log(numClass);
            console.log(compras);

            compras.forEach(w => {
                total += valorFinal(w[0], w[1])[2];
            })
            totalBarVenta.getElementsByTagName('th')[1].innerHTML = 'S/.' + total[2];
            payfast.getElementsByTagName('h3')[1].getElementsByTagName('span')[0].textContent = 'S/.' + total[2];
        }

    });
    for (const i of detalleProd) {
        const button = i.querySelector('.fas');
        button.onclick = e => {
            const classList = i.querySelector('.u-cont').classList;
            if (classList.contains('grid')) classList.remove('grid');
            else classList.add('grid');
        }
    }
    let totT = 0;
    compras.forEach(e => {
        totT += valorFinal(e[0], e[1])[2];
        payfast.getElementsByTagName('h3')[1].getElementsByTagName('span')[0].textContent = 'S/.' + totT;

    })


    console.log(compras);




}

// ------------------------PAGE--THREE--------------------

function pageTHREE() {
    curretnPage = pages[3];
    header.innerHTML = '';
    section1.innerHTML = '';
    section2.innerHTML = '';
    footer.innerHTML = ''; 
                

    header.insertAdjacentHTML('afterbegin', htmlSobreNosotros);

    const sobnos = getById('sobre-nosotros'),
        hPag = getById('header-ban'),
        b1Pag = getById('ban-1'),
        b2Pag = getById('ban-2'),
        b3Pag = getById('ban-3'),
        b4Pag = getById('ban-4'),
        vid1 = getById('videodedicacion'),
        vid2 = getById('videoconfianza'),
        vid3 = getById('videopuntualidad'),
        vid4 = getById('videocalidad');

    const verVid1 = sobnos.getElementsByTagName('h3')[0].getElementsByTagName('span')[0];
    const verVid2 = sobnos.getElementsByTagName('h3')[0].getElementsByTagName('span')[1];
    const verVid3 = sobnos.getElementsByTagName('h3')[1].getElementsByTagName('span')[0];
    const verVid4 = sobnos.getElementsByTagName('h3')[1].getElementsByTagName('span')[1];
    let classList;
    verVid1.onclick=e=>{classList=vid1.classList;classList.contains('showvideo')?classList.remove('showvideo'):classList.add('showvideo')}
    verVid2.onclick=e=>{classList=vid2.classList;classList.contains('showvideo')?classList.remove('showvideo'):classList.add('showvideo')}
    verVid3.onclick=e=>{classList=vid3.classList;classList.contains('showvideo')?classList.remove('showvideo'):classList.add('showvideo')}
    verVid4.onclick=e=>{classList=vid4.classList;classList.contains('showvideo')?classList.remove('showvideo'):classList.add('showvideo')}

    window.onscroll = e => {
        let scroll = window.scrollY;
        const st = { block: 'start' };
        if (scroll > 150 && scroll < 300) {
            b1Pag.scrollIntoView(st);
        }
        if (scroll > 730 && scroll < 740) {
            hPag.scrollIntoView(st);
        }
        if (scroll > 950 && scroll < 980) {
            b2Pag.scrollIntoView(st);
        }
        if (scroll > 1450 && scroll < 1470) {
            b1Pag.scrollIntoView(st);
        }
        if (scroll > 1700 && scroll < 1720) {
            b3Pag.scrollIntoView(true);
        }
        if (scroll > 2160 && scroll < 2170) {
            b2Pag.scrollIntoView(st);
        }
        if (scroll > 2470 && scroll < 2480) {
            b4Pag.scrollIntoView(true);
        }
        if (scroll > 2920 && scroll < 2930) {
            b3Pag.scrollIntoView(true);
        }
    }

}


// -------------------Final--------------



document.body.setAttribute('onload', 'pageHome();');

itemButton[0].onclick = e => {
    if (curretnPage !== 'home') {
        pageHome();
    }
}

itemButton[1].onclick = e => {

    if (curretnPage !== 'pageOne') {
        pageONE();
    }
}

itemButton[2].onclick = e => {

    if (curretnPage !== 'pageTwo') {
        pageTWO();
    }
}


itemButton[3].onclick = e => {

    if (curretnPage !== 'pageThree') {
        pageTHREE();
    }
}

homeButton.onclick = e => {
    if (curretnPage !== 'home') {
        pageHome();
        barraItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        barraItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

title.onclick = e => {
    if (curretnPage !== 'home') {
        pageHome();
        barraItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        barraItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
 