const URL_Product = "http://localhost:8080/productos"

let ID_producto = 0

async function get_productos(URL_Product) {
    const resp = await fetch(URL_Product)
    const productos = await resp.json()
    return productos
}

const UTPDATE = {
    update: false,
    idCel: null
}

async function main() {
    const productos = await get_productos(URL_Product)
    listarProductos(productos)
}

main()

async function crear(producto) {

    const resp = await fetch(URL_Product, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    const text = await resp.text()
    if (text =="Se registro correctamente el nuevo celular") {
        swal(text,"Registrado","success")
        main()
    } else {
        swal(text,"O revise los datos ingresados","error")
        main()
    }
}

async function archivoAgregar() {
    
    var formulario = document.getElementById("formAgregar")
    
    const resp = await fetch("http://localhost:8080/productos/files", {

        method: 'POST',
        
        body: new FormData(formulario)
    })
}

async function archivoActualizar() {
    
    var formulario = document.getElementById("formActualizar")
    
    const resp = await fetch("http://localhost:8080/productos/files", {

        method: 'POST',
        
        body: new FormData(formulario)
    })
}

function listarProductos(productos) {
    const table = document.getElementById("tbody")
    let tbody = ""
    
    for (let i = 0; i < productos.length; i++) {  
        const p = productos[i]
        tbody += `<tr>
                    <td>${p.idProductos}</td>
                    <td>${p.nombre}</td>
                    <td>${p.descripcion}</td>
                    <td>
                    <img src="imagenes/${p.imagen}" alt="${p.imagen}">
                    </td>
                    <td>$${p.precio.toLocaleString(2)}</td>
                    <td>${p.stock}</td>
                    <td>
                     <button type="button" id="btnedit" onclick='set_datos_form(${JSON.stringify(p)})' class="btn btn-success btn-just-icon btn-sm"
                                             data-toggle="modal" data-target=".editarProducto">
                                             <i class="material-icons">edit</i>
                                   </button>
                     <button type="button" id="btneliminar" onclick='btn_eliminar(${JSON.stringify(p)})' class="btn btn-danger btn-just-icon btn-sm"
                            data-original-title="" title="" data-toggle="modal"
                            data-bs-target="exampleModal">
                            <i class="material-icons">delete</i>
                    </button>
                    </td>
                 </tr>`
    }
    table.innerHTML = tbody
}

function agregarProducto(){
    UTPDATE.update=false
}


function get_datos_form(evt) {
    evt.preventDefault()
    const form = evt.target
    let foto = form.imagen.value
    var img=(foto.slice(12))
    const producto = {
        nombre: form.nombreCel.value,
        descripcion: form.descripcionCel.value,
        precio: form.precioCel.value,
        stock: form.stockCel.value,
        imagen: img
    }
    
    if (UTPDATE.update) {
        producto.idProductos = UTPDATE.idCel
        actualizar(producto)
        archivoActualizar()    
    }else{ 
        archivoAgregar()
        crear(producto) 
    }
    limpiar(form)
}



function limpiar(form) {
    form.nombreCel.value = ""
    form.precioCel.value = ""
    form.stockCel.value = ""
    form.descripcionCel.value = ""
}


async function actualizar(producto) {
    const resp = await fetch(URL_Product, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
    const text = await resp.text()

    if (text == "Celular actualizado correctamente") {
        swal(text, "Actualizado", "success").then(function() {
            window.location = "productos.html";
        })
        main()
    }else{
        swal(text, "O revise los datos ingresados", "error")
    }
}

function set_datos_form(producto) {
    document.getElementById("nombre").setAttribute("value", producto.nombre)
    document.getElementById("precio").setAttribute("value", producto.precio)
    document.getElementById("stock").setAttribute("value", producto.stock)
    document.getElementById("descripcionCel").innerText = producto.descripcion
    UTPDATE.update = true
    UTPDATE.idCel = producto.idProductos
}

async function eliminar() {

    const resp = await fetch(`${URL_Product}/${ID_producto}`, {
        method: 'DELETE'
    })
    main()
}


function btn_eliminar(producto){

    ID_producto = producto.idProductos

    swal({
        title: "¿Está seguro?",
        text: "¿Desea eliminar el "+producto.nombre,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            eliminar()
            swal("Registro de celular eliminado!", {
            icon: "success",
          });
        } else {
          swal("Su Registro está a salvo!!");
        }
      });
}






