const URL_usuarios = "http://localhost:8080/usuarios"

let ID_usuarios = 0

async function get_usuarios(URL_usuarios) {
    const resp = await fetch(URL_usuarios)
    const usuarios = await resp.json()
    return usuarios
}

const UTPDATE = {
    update: false,
    idUsu: null
}

async function main() {
    const usuarios = await get_usuarios(URL_usuarios)
    listarUsuarios(usuarios)
}

main()


async function crear(usuarios) {

    const resp = await fetch(URL_usuarios, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarios)
    })
    const text = await resp.text()
    if (text == "Se registro correctamente el nuevo usuario") {
        swal(text, "Registrado","success")
        main()
    } else {
        swal(text, "O revise los datos ingresados", "error")
        main()
    }
}

function listarUsuarios(usuarios) {
    const table = document.getElementById("tbody")
    let tbody = ""
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios[i]

        tbody += `<tr>
                    <td>${u.numIdentificacion}</td>
                    <td>${u.nombres}</td>
                    <td>${u.apellidos}</td>
                    <td>${u.direccion}</td>
                    <td>${u.email}</td>
                    <td>${u.celular}</td>
                    <td>${u.clave}</td>
                    <td>
                    
                    <button type="button" id="btnedit" onclick='set_datos_form(${JSON.stringify(u)})' class="btn btn-success btn-just-icon btn-sm"
                                                                  data-toggle="modal" data-target=".editarUsuario">
                                                                  <i class="material-icons">edit</i>
                                                        </button>
                                                 
                    <div class="btn btn-danger btn-just-icon btn-sm m-2"
                    <button type="button" id="btneliminar" onclick='btn_eliminar(${JSON.stringify(u)})' class="btn btn-danger btn-just-icon btn-sm"
                                                        data-original-title="" title="" data-toggle="modal"
                                                        data-bs-target="exampleModal">
                                                        <i class="material-icons">delete</i>
                                                </button>
                    <div/>
                    </td>
                </tr>`
    }
    table.innerHTML = tbody
}


function get_datos_form(evt) {
    evt.preventDefault()
    const form = evt.target
    const usuarios = {
        nombres: form.nombresUsu.value,
        apellidos: form.apellidosUsu.value,
        numIdentificacion: form.identificacion.value,
        direccion: form.direccionUsu.value,
        email: form.emailUsu.value,
        celular: form.celularUsu.value,
        clave: form.claveUsu.value
    }

    if (UTPDATE.update) {
        usuarios.idUsuarios = UTPDATE.idUsu
        actualizar(usuarios)
    } else {
        crear(usuarios)
    }
    clear(form)

}


function clear(form) {
    form.nombresUsu.value = ""
    form.apellidosUsu.value = ""
    form.identificacion.value = ""
    form.direccionUsu.value = ""
    form.emailUsu.value = ""
    form.celularUsu.value = ""
    form.claveUsu.value = ""
}


async function actualizar(usuarios) {
    const resp = await fetch(URL_usuarios, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarios)
    })
    const text = await resp.text()

    if (text == "Usuario actualizado correctamente") {
        swal(text, "Actualizado", "success")
    } else {
        swal(text, "O revise los datos ingresados", "error")
    }
}

function set_datos_form(usuarios) {
    document.getElementById("nombres").setAttribute("value", usuarios.nombres)
    document.getElementById("apellidos").setAttribute("value", usuarios.apellidos)
    document.getElementById("numIdentificacion").setAttribute("value", usuarios.numIdentificacion)
    document.getElementById("direccion").setAttribute("value", usuarios.direccion)
    document.getElementById("email").setAttribute("value", usuarios.email)
    document.getElementById("celular").setAttribute("value", usuarios.celular)
    document.getElementById("clave").setAttribute("value", usuarios.clave)
    UTPDATE.update = true
    UTPDATE.idUsu = usuarios.idUsuarios
}

async function eliminar() {

    const resp = await fetch(`${URL_usuarios}/${ID_usuarios}`, {
        method: 'DELETE'
    })
    main()
}

function btn_eliminar(usuarios){
    ID_usuarios = usuarios.idUsuarios

    swal({
        title: "¿Está seguro?",
        text: "¿Desea eliminar el usuario "+usuarios.nombres,
        icon: "warning",
        buttons: true,
        dangerMode: true,
        
      })
      .then((willDelete) => {
        if (willDelete) {
            eliminar()
            swal("Usuario eliminado!", {
            icon: "success",
          });
        } else {
          swal("Su Registro está a salvo!!");
        }
      });
}

function recargar() {
    window.location.href = "usuarios.html"
}






