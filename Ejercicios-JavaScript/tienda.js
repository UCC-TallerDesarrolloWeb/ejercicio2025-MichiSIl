"use strict";

/* ====== Datos ====== */
const productos = [
  { nombre: "Cabezal Sparring", description: "Cabezal de Sparring.", categoria: "Protectores", marca: "Gran Marc", talle: ["1","2","3"], precio: 35000, web: "https://www.granmarctiendaonline.com.ar/productos/cabezal-cerrado/", imagen: "cabezal-cerrado.webp" },
  { nombre: "Dobok Dan", description: "Dobok aprobado para torneos internacionales.", categoria: "Dobok", marca: "Daedo", talle: ["1","2","3","4","5","6","7","8"], precio: 115000, web: "https://www.daedo.com/products/taitf-10813", imagen: "dobok.webp" },
  { nombre: "Escudo de Potencia", description: "Escudo de potencia para entrenamientos.", categoria: "Entrenamiento", marca: "Gran Marc", talle: ["s/talle"], precio: 51700, web: "https://www.granmarctiendaonline.com.ar/productos/escudo-de-potencia-grande/", imagen: "escudo-potencia.webp" },
  { nombre: "Par de focos redondos", description: "Par de focos de 25cm x 25cm para hacer entrenamiento.", categoria: "Entrenamiento", marca: "Gran Marc", talle: ["s/talle"], precio: 15000, web: "https://www.granmarctiendaonline.com.ar/productos/foco-con-dedos/", imagen: "foco-con-dedos.webp" },
  { nombre: "Guantes 10 onzas", description: "Guantes de Sparring de 10 onzas habilitados para torneos internacionales", categoria: "Protectores", marca: "Daedo", talle: ["s/talle"], precio: 35000, web: "https://www.daedo.com/products/pritf-2020", imagen: "protectores-manos.webp" },
  { nombre: "Protectores Pie", description: "Protectores de Pie habilitados para torneos internacionales", categoria: "Protectores", marca: "Daedo", talle: ["XXS","XS","S","M","L","XL"], precio: 35000, web: "https://www.daedo.com/collections/collection-itf-gloves/products/pritf-2022", imagen: "protectores-pie.webp" },
];

/* ===== Utilidades ===== */
const fmtARS = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");

/* ===== Render catálogo con contador ===== */
function renderProductos(lista) {
  const cont = document.getElementById("mostrar-catalogo");
  if (!cont) return;

  // cabecera con contador
  const header = `
    <div class="catalog-count">
      Mostrando <strong>${lista.length}</strong> producto${lista.length === 1 ? "" : "s"}
    </div>
  `;

  if (!lista || lista.length === 0) {
    cont.innerHTML = header + `
      <div class="catalog-empty">
        No hay productos que coincidan con el filtro.
      </div>`;
  } else {
    cont.innerHTML =
      header +
      lista
        .map(
          (p) => `
        <article class="item">
          <img src="images/${p.imagen}" alt="${p.nombre}" />
          <h3>${p.nombre}</h3>
          <p><strong>${fmtARS.format(p.precio)}</strong></p>
          <div>
            <button type="button" onclick="mostrarModal(${productos.indexOf(p)})">Ver Detalle del Producto</button>
            <button type="button" onclick="agregarAlcarrito(${productos.indexOf(p)})">Agregar al Carrito</button>
          </div>
        </article>`
        )
        .join("");
  }
}

/* ===== Filtros ===== */
function leerFiltros() {
  const q = norm(document.getElementById("search")?.value || "");
  const minInput = document.getElementById("price-min")?.value;
  const maxInput = document.getElementById("price-max")?.value;

  let min = Number(minInput);
  let max = Number(maxInput);
  if (Number.isNaN(min)) min = 0;
  if (Number.isNaN(max) || max === 0) max = Infinity;
  if (min > max) [min, max] = [max, min];

  const catsMarcadas = ["protectores","dobok","entrenamiento"]
    .filter((id) => document.getElementById(id)?.checked)
    .map((c) => c.toLowerCase());

  return { q, min, max, catsMarcadas };
}

function aplicarFiltros() {
  const { q, min, max, catsMarcadas } = leerFiltros();

  const filtrados = productos.filter((p) => {
    const textoOK =
      !q ||
      norm(p.nombre).includes(q) ||
      norm(p.description).includes(q) ||
      norm(p.marca).includes(q);

    const precioOK = p.precio >= min && p.precio <= max;

    const catOK = catsMarcadas.length === 0
      ? true
      : catsMarcadas.includes(norm(p.categoria));

    return textoOK && precioOK && catOK;
  });

  renderProductos(filtrados);
}

/* Debounce para búsqueda */
function debounce(fn, ms = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), ms);
  };
}

/* ===== Contadores públicos ===== */
function contarProductos() {
  // devuelve el total que cumple filtros actuales
  const { q, min, max, catsMarcadas } = leerFiltros();
  return productos.filter((p) => {
    const textoOK =
      !q ||
      norm(p.nombre).includes(q) ||
      norm(p.description).includes(q) ||
      norm(p.marca).includes(q);
    const precioOK = p.precio >= min && p.precio <= max;
    const catOK = catsMarcadas.length === 0
      ? true
      : catsMarcadas.includes(norm(p.categoria));
    return textoOK && precioOK && catOK;
  }).length;
}

function actualizarContadorCarrito() {
  const el = document.getElementById("count-carrito");
  if (!el) return;
  const n = getCarrito().length;
  el.textContent = n;
  el.style.display = n ? "inline-block" : "none";
}

/* ===== Modal (dialog nativo) ===== */
function mostrarModal(id) {
  const p = productos[id];
  const modal = document.getElementById("modal");
  const titulo = document.getElementById("titulo-producto");
  const descr = document.getElementById("descr-producto");
  if (!p || !modal || !titulo || !descr) return;

  titulo.textContent = p.nombre;
  descr.textContent = p.description;

  if (typeof modal.showModal === "function") modal.showModal();
  else modal.setAttribute("open", "");
}
function cerrarModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  if (typeof modal.close === "function") modal.close();
  else modal.removeAttribute("open");
}

/* ===== Carrito ===== */
function getCarrito() {
  try { return JSON.parse(localStorage.getItem("carrito") || "[]"); }
  catch { return []; }
}
function setCarrito(list){ localStorage.setItem("carrito", JSON.stringify(list)); }

function agregarAlcarrito(id) {
  const list = getCarrito();
  list.push(id);
  setCarrito(list);
  actualizarContadorCarrito();
  cargarCarrito(); // refresca si estás en carrito.html
}

function cargarCarrito() {
  const cont = document.getElementById("mostrar-carrito");
  if (!cont) { actualizarContadorCarrito(); return; }

  const list = getCarrito();
  if (list.length === 0) {
    cont.innerHTML = `<div class="cart-empty">Su carrito está vacío.</div>`;
    actualizarContadorCarrito();
    return;
  }

  cont.innerHTML = list.map((num, idx) => {
    const p = productos[num]; if (!p) return "";
    return `
      <div class="cart-item">
        <img class="cart-thumb" src="images/${p.imagen}" alt="${p.nombre}" />
        <div class="cart-info">
          <h3>${p.nombre}</h3>
          <p class="cart-price">${fmtARS.format(p.precio)}</p>
        </div>
        <div class="cart-actions">
          <button type="button" onclick="eliminarProducto(${idx})">Eliminar del carrito</button>
        </div>
      </div>`;
  }).join("") + `
    <div class="cart-footer">
      <button type="button" class="btn-danger" onclick="vaciarCarrito()">Vaciar Carrito</button>
    </div>`;

  actualizarContadorCarrito();
}

function vaciarCarrito(){ localStorage.removeItem("carrito"); cargarCarrito(); }
function eliminarProducto(idx){
  const list = getCarrito();
  list.splice(idx,1);
  list.length ? setCarrito(list) : localStorage.removeItem("carrito");
  cargarCarrito();
}

/* ===== Init ===== */
window.addEventListener("DOMContentLoaded", () => {
  renderProductos(productos);
  cargarCarrito();

  // listeners de filtros
  const $q = document.getElementById("search");
  const $min = document.getElementById("price-min");
  const $max = document.getElementById("price-max");
  const $protectores = document.getElementById("protectores");
  const $dobok = document.getElementById("dobok");
  const $entrenamiento = document.getElementById("entrenamiento");

  if ($q) $q.addEventListener("input", debounce(aplicarFiltros, 250));
  [$min, $max].forEach(el => el && el.addEventListener("input", aplicarFiltros));
  [$protectores, $dobok, $entrenamiento].forEach(el => el && el.addEventListener("change", aplicarFiltros));
});

/* Exponer funciones (botones inline + consola) */
window.mostrarModal = mostrarModal;
window.cerrarModal = cerrarModal;
window.agregarAlcarrito = agregarAlcarrito;
window.vaciarCarrito = vaciarCarrito;
window.eliminarProducto = eliminarProducto;
window.aplicarFiltros = aplicarFiltros;
window.contarProductos = contarProductos;
