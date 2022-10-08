const URL_Contacto = "http://localhost:8080/contacto"




function get_datos_form(evt) {
    evt.preventDefault()
    const form = evt.target
    
    const contacto = {
        nombre: form.nombres.value,
        email: form.email.value,
        tema: form.tema.value,
        mensaje: form.mensaje.value,
    }
    crear(contacto)
    limpiar(form)
}

function limpiar(form) {
    form.nombres.value = ""
    form.email.value = ""
    form.tema.value = ""
    form.mensaje.value = ""
}


async function crear(contacto) {

    const resp = await fetch(URL_Contacto, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contacto)
    })
    const text = await resp.text()
    if(text =="Gracias por escribirnos. Intentaremos responderte lo antes posible."){
        swal({
            title: "Enviado",
            text:  text,
            icon: "info",
            button: "Ok",
          });
    }
   
}

