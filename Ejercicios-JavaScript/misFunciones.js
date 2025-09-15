/**
 * Convierte las unidades ingreasadas por el usuario
 * Descripción
 * @method convertirUnidades
 * @param {string} unidad - Unidad ingresada: metro, pie, pulgada, yarda
 * @param {number} valor - Valor numerico ingresado por el usuario (puede ser con coma) 
 */

    let convertirUnidades = (unidad, valor) => {
    let metro, pulgada, pie, yarda;

    if(valor.includes(" , ")) { 
        valor = valor.replace(" , ", " . "); 
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
        } else if(unidad == "unid_pie") { 
        pie = valor; 
        metro = 0.3048 * pie; 
        pulgada = 12 * pie; 
        yarda = 0.3333 * pie; 
        } else if (unidad === "unid_pulgada") {
        pulgada = valor;
        metro = 0.0254 * pulgada;
        pie = 0.0833 * pulgada;
        yarda = 0.0278 * pulgada;
        } else if (unidad === "unid_yarda") { 
        yarda = valor;
        metro = 0.9144 * yarda;
        pulgada = 36 * yarda;
        pie = 3 * yarda;
        }
    }

    document.getElementById("metro").value = Number (metro).toFixed(2);
    document.getElementById("pulgada").value = Number (pulgada).toFixed(2);
    document.getElementById("pie").value = Math.round(pie*100)/100;
    document.getElementById("yarda").value = Math.round(yarda*100)/100; 

    /**
    * Convierte grados en radianes y viceversa
    * @method convertirUnidades
    * @param {string} id - Grados o Radianes
    * @param {number} valor - Valor numerico ingresado por el usuario (puede ser con coma) 
    */

    let convertirGR = (id, valor) =>  { 
        let cantGrados, cantRadianes; 
        if(id == "grados"){
            cantGrados = valor; 
            cantRadianes = cantGrados*Math.PI/180
            document.getElementById("radianes").value = cantRadianes; 
        } else { 
            cantRadianes = valor;
            cantGrados = cantRadianes*Math.PI/180
            document.getElementById("grados").value = cantGrados; 
        }
    }

}; 

let mostrarOcultarDiv = (id) => { 
    const mostrar = id == "mostrarDiv" ? "block" : "none"; 
    document.getElementsByName("unDiv")[0].style.display = mostrar ; 
}; 

// if(id==mostrarDiv) { 
// document.getElementsByName("unDiv")[0].style.display = "block"; 
//  } else { 
//    document.getElementsByName("unDiv")[0].style.display = "none";
// }

let sumar = () => { 
    let sum_num1 = document.getElementById("nums1").value; 
    let sum_num2 = document.getElementById("nums2").value;

    if(isNaN(sum_num1) || isNaN(sum_num2)) { 
        alert("Una de las variables ingresadas no es numérica");
    } else { 
        document.getElementById("totalS").value = Number(sum_num1) + Number(sum_num2); 
    }
}; 

let restar = () => { 
    let res_num1 = document.getElementById("numr1").value; 
    let res_num2 = document.getElementById("numr2").value;

    if(isNaN(res_num1) || isNaN(res_num2)) { 
        alert("Una de las variables ingresadas no es numérica");
    } else { 
        document.getElementById("totalR").value = Number(res_num1) - Number(res_num2); 
    }
}; 

let multiplicacion = () => { 
    let mul_num1 = document.getElementById("numm1").value; 
    let mul_num2 = document.getElementById("numm2").value;

    if(isNaN(mul_num1) || isNaN(mul_num2)) { 
        alert("Una de las variables ingresadas no es numérica");
    } else { 
        document.getElementById("totalM").value = Number(mul_num1) * Number(mul_num2); 
    }
}; 

let division = () => { 
    let div_num1 = document.getElementById("numd1").value; 
    let div_num2 = document.getElementById("numd2").value;

    if(isNaN(div_num1) || isNaN(div_num2)) { 
        alert("Una de las variables ingresadas no es numérica");
    } else { 
        if(Number(div_num2) === 0) {
            alert("No se puede dividir por cero");
        } else {
            document.getElementById("totalD").value = Number(div_num1) / Number(div_num2); 
        }
    }
};