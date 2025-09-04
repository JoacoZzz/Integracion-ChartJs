const express = require('express')
const sequelize = require('./Conexion/database')
const Employee = require('./Modelos/Employee')
const Product = require('./Modelos/Product')
var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json())

//Get, 

//select SUM(salary) as 'Total Salario x DEpto',department_id from employees group by department_id
app.get('/sum-salario-por-departamento', async (req, resp) => {


    try {
        const resultado = await Employee.findAll({
            attributes: [
                'DEPARTMENT_ID',
                [sequelize.fn('SUM', sequelize.col('SALARY')), 'Salario_Total']
            ],
            group: ['DEPARTMENT_ID']
        });

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontados', data: resultado })
        }
        else {
            resp.status(400).json({ 'Mensaje': 'Datos No Encontados', data: [] })
        }

    } catch (error) {
        resp.status(500).json({ 'Mensaje': 'Ocurrio un error', data: error })
    }

});

//select count(*), department_id,job_id from employees group by department_id,job_id order by job_id;
app.get('/conteo-empleados-por-depto', async (req, resp) => {
    try {

        const resultado = await Employee.findAll({
            attributes: ['DEPARTMENT_ID',
                'JOB_ID',
                [sequelize.fn('COUNT', sequelize.col('*')), 'total_empleados']
            ],
            group: ['DEPARTMENT_ID', 'JOB_ID']
        })

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontados', data: resultado })
        }
        else {
            resp.status(400).json({ 'Mensaje': 'Datos No Encontados', data: [] })
        }
    } catch (error) {
        console.log(error)
        resp.status(500).json({ 'Mensaje': 'Ocurrio un error', data: error })

    }
});

app.get('/salario-maximo-por-departamento/:idDepto', async (req, resp) => {
    try {

        const { idDepto } = req.params;

        const resultado = await Employee.findAll({
            attributes: [
                'DEPARTMENT_ID',
                [sequelize.fn('SUM', sequelize.col('SALARY')), 'salario_maximo']
            ],
            where: { DEPARTMENT_ID: idDepto },
            group: ['DEPARTMENT_ID']
        })

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontados', data: resultado })
        }
        else {
            resp.status(400).json({ 'Mensaje': 'Datos No Encontados', data: [] })
        }

    } catch (error) {
        resp.status(500).json({ 'Mensaje': 'Ocurrio un error', data: error })

    }
})
app.listen(5000, () => {
    console.log('Aplicaicon iniciada en puerto 5000')
})

// get cantidad de productos por categoría
app.get('/productos-por-categoria', async (req, resp) => {
    try {
        const resultado = await Product.findAll({
            attributes: [
                ['categoryCode', 'categoryName'],
                [sequelize.fn('COUNT', sequelize.col('categoryCode')), 'total_products']
            ],
            group: ['categoryCode']
        });

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontrados', data: resultado })
        } else {
            resp.status(400).json({ 'Mensaje': 'Datos No Encontrados', data: [] })
        }

    } catch (error) {
        console.log(error);
        resp.status(500).json({ 'Mensaje': 'Ocurrió un error', data: error })
    }
  
});

// Get valor promedio de productos por categoria
app.get('/promedio-valor-por-categoria', async (req, resp) => {
    try {
        const resultado = await Product.findAll({
            attributes: [
                ['categoryCode', 'categoryName'],
                [sequelize.fn('AVG', sequelize.col('value')), 'avg_value']
            ],
            group: ['categoryCode']
        });

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontrados', data: resultado });
        } else {
            resp.status(400).json({ 'Mensaje': 'Datos No Encontrados', data: [] });
        }

    } catch (error) {
        console.log(error);
        resp.status(500).json({ 'Mensaje': 'Ocurrió un error', data: error });
    }
});


//Get valor promedio y la cantidad de productos por cada lineCode
app.get('/promedio-valor-por-linecode', async (req, resp) => {
    try {
        const resultado = await Product.findAll({
            attributes: [
                ['lineCode', 'lineCode'],
                [sequelize.fn('AVG', sequelize.col('value')), 'avg_value'],
                [sequelize.fn('COUNT', sequelize.col('*')), 'total']
            ],
            group: ['lineCode']
        });

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontrados', data: resultado });
        } else {
            resp.status(400).json({ 'Mensaje': 'Datos No Encontrados', data: [] });
        }

    } catch (error) {
        console.log(error);
        resp.status(500).json({ 'Mensaje': 'Ocurrió un error', data: error });
    }
});


//Para poder trabajar con los campos con nombres que llevan un '.' entre sí, se renombré las columnas
//en la BD para poder trabajar sin problemas, se alteró así:
//ALTER TABLE products CHANGE `category.code` categoryCode VARCHAR(255);
//ALTER TABLE products CHANGE `brand.code` brandCode VARCHAR(255);
//ALTER TABLE products CHANGE `family.code` familyCode VARCHAR(255);
//ALTER TABLE products CHANGE `line.code` lineCode VARCHAR(255);
//ALTER TABLE products CHANGE `productSegment.code` productSegmentCode VARCHAR(255);