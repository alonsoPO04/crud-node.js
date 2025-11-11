//MODULO CONFIGURAR VARIABLES DE ENTORNO
require('dotenv').config();

//MODULO EXPRESS
const express = require ('express');
//INICIALIZAR EXPRESS
const app = express();
//MIDDLEWARE PARA SOBRESCRIBIR METODOS HTTP
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//MOTOR DE PLANTILLAS EJS Y LAYOUTS
const layouts = require('express-ejs-layouts');
//MIDDLEWARES
const path = require('path');
//PARSEO DE JSON
app.use(express.urlencoded({ extended: false }));
//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));
//CONFIGURAR EJS
app.set('view engine', 'ejs');
//CONFIGURAR RUTA DE VISTAS
app.set('views', path.join(__dirname, 'src/views'));
//CONFIGURAR LAYOUTS
app.use(layouts);
//RUTA POR DEFECTO DE LAYOUT
app.set('layout','layouts/layout');
//ROUTERS
const mainRouter = require('./src/routes/main.router');
//USAR ROUTERS
app.use(mainRouter);
//RUTAS DE PRODUCTOS Y CONTACTO
app.use("/productos", require("./src/routes/productos.router"));

app.use("/contacto", require("./src/routes/contacto.router"));

app.use("/categorias", require("./src/routes/categorias.router"));


//SERVIDOR
const PORT =   process.env.PORT || 3001;
//PONER A ESCUCHAR EL SERVIDOR
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));