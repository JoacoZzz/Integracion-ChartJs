import axios from "axios";


const API_URL="http://localhost:5000";

export async function fetchSumSalarioDepto(){

    const response=await axios.get(`${API_URL}/sum-salario-por-departamento`);
    return response.data;
}


export async function fetchEmpleadoDepto() {

    const response = await axios.get(`${API_URL}/conteo-empleados-por-depto`)
    return response.data.data;
}

export async function fetchSalarioMaximo(idDepto:number) {

     const response = await axios.get(`${API_URL}/salario-maximo-por-departamento/${idDepto}`)
    return response.data.data;
    
}

export async function fetchProductosPorCategoria() {
    const response = await axios.get(`${API_URL}/productos-por-categoria`);
    return response.data.data; 

}

export async function fetchPromedioValorPorCategoria() {
    const response = await axios.get(`${API_URL}/promedio-valor-por-categoria`);
    return response.data.data;

}

export async function fetchPromedioValorYTotalPorLine() {
    const response = await axios.get(`${API_URL}/promedio-valor-por-linecode`);
    return response.data.data;

}