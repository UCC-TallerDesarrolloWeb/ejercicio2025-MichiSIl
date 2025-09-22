/**
 * Convierte las unidades ingresadas por el usuario
 * @method convertirUnidades
 * @param  {string} Parámetro  unidad - unidad ingresada: metro, pie, pulgada, yarda
 * @param {number} Parámetro valor - valor numerico ingresado por el usuario
 * @return Valor que retorna
 */

let mostrarModal = () => {
  document.getElementById("modal").style.display = "block";
};

let cerrarModal = () => {
  document.getElementById("modal").style.display = "none";
};



const convertirUnidades= (unidad, valor) => {
    let metro, pulgada, pie, yarda;

    if (valor.includes(",")) {
        valor = valor.replace(",",".");
    }

    if(isNaN(valor)) { 
        alert("El valor ingresado no es correcto"); 
        metro = " ";
        pie = " "; 
        pulgada = " "; 
        yarda = " "; 
    } else {  
    if (unidad === "unid_metro") {
        metro = valor;
        pie = 3.28 * metro;
        pulgada = 39.37 * metro;
        yarda = 1.0936 * metro;
    }
    else if (unidad === "unid_pulgada") {
        pulgada = valor;
        metro = 0.0254 * pulgada;
        pie = 0.0833 * pulgada;
        yarda = 0.0278 * pulgada;
    }
    else if (unidad === "unid_pie") {
        pie = valor;
        metro = 0.3048 * pie;
        pulgada = 12 * pie;
        yarda = 0.3333 * pie;
    }   
    else if (unidad === "unid_yarda") { 
        yarda = valor;
        metro = 0.9144 * yarda;
        pulgada = 36 * yarda;
        pie = 3 * yarda;
    }
}

    document.getElementById("metro").value =  Number(metro).toFixed(2);
    document.getElementById("pulgada").value = Number(pulgada).toFixed(2);
    document.getElementById("pie").value = Number(pie).toFixed(2);
    document.getElementById("yarda").value = Math.round(yarda*100)/100; 

}

let convertirGR = (id, valor) => {
    let cantgrados, cantradianes;
    if(id=="grados")  {
        cantgrados = valor;
        cantradianes = cantgrados*Math.PI/180;
        document.getElementById("radianes").value = cantradianes;

    }  else if(id=="radianes")  {
        cantradianes = valor;
        cantgrados = cantradianes*180/Math.PI;
        document.getElementById("grados").value = cantgrados;

    }
}

let mostrarOcultarDiv = (id) => {
   // if (id=="mostrarDiv") {
    //    document.getElementByName("unDiv")[0].style.display = "block";
   // } else if (id=="ocultarDiv") {
   //     document.getElementByName("unDiv")[0].style.display = "none";
   // }

   const mostrar = id == "mostrarDiv" ? "block" : "none";
   document.getElementsByClassName("color-div")[0].style.display = mostrar;

}

let sumar = () => {
    console.log("sumar");
    let sum1 = document.getElementById("nums1").value;
    let sum2 = document.getElementById("nums2").value;

    if (isNaN(sum1) || isNaN(sum2)) {

        alert("Una de las variables ingresadas no es un numero");
    } else {
        document.getElementById("totals").innerHTML = Number(sum1) + Number(sum2);
    }

}

let restar = () => {
    console.log("restar");
    let res1 = document.getElementById("numr1").value;
    let res2 = document.getElementById("numr2").value;  
    if (isNaN(res1) || isNaN(res2)) {

        alert("Una de las variables ingresadas no es un numero");
    } else {
        document.getElementById("totalR").innerHTML = Number(res1) - Number(res2);
    }   
}
let multiplicar = () => {
    console.log("multiplicar");
    let mul1 = document.getElementById("numm1").value;
    let mul2 = document.getElementById("numm2").value;  
    if (isNaN(mul1) || isNaN(mul2)) {
        alert("Una de las variables ingresadas no es un numero");
    } else {
        document.getElementById("totalM").innerHTML = Number(mul1) * Number(mul2);
    }
}   
let dividir = () => {
    console.log("dividir");
    let div1 = document.getElementById("numd1").value;
    let div2 = document.getElementById("numd2").value;  
    if (isNaN(div1) || isNaN(div2)) {
        alert("Una de las variables ingresadas no es un numero");
    } else {
        document.getElementById("totalD").innerHTML = Number(div1) / Number(div2);
    }   
}