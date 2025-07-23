import { connection } from '../database/connection.js'
import sql from 'mssql';

export const getEmpresas = async (req, res)=>{    
    const pool = await connection();
    const query = await pool.request().query('SELECT * FROM empresa')
    if (query.rowsAffected[0]==0){
        return req.status(404).json({message: "No hay Empresas que mostrar"})
    }

    return res.json(query.recordset)
}
export const getEmpresa = async (req, res)=>{
    const idParams = req.params.id
    const pool = await connection();
    const query = await pool.request()
    .input('id', sql.Int, idParams)
    .query('SELECT * FROM EMPRESA WHERE id =@id')
    
    if (query.rowsAffected[0]== 0) {
        return res.status(404).json({message: 'Empresa no encontrada'})
    } 
    return res.json(query.recordset[0])
}
export const createEmpresa = async (req, res)=>{
    const pool = await connection();
    
    const query = await pool.request()
    .input('nombre',sql.NVarChar, req.body.nombre_tce )
    .input('fecha',sql.Date, req.body.fecha_in )
    .query('INSERT INTO empresa (nombre_tce, fecha_in) VALUES (@nombre, @fecha); SELECT SCOPE_IDENTITY() AS id'); 

    const data = {
        id: query.recordset[0].id,
        nombre_tce: req.body.nombre_tce,
        fecha_in: req.body.fecha_in
    }    
    res.json(data)
}
export const updateEmpresa = async (req, res)=>{  
    const idParams =  req.params.id  
    const name =  req.body.nombre_tce  
    const fecha =  req.body.fecha_in

    const pool = await connection();
    const query = await pool.request()
    .input('id', sql.Int, idParams)
    .input('nombre', sql.NVarChar, name)
    .input('fecha', sql.Date, fecha)
    .query('UPDATE empresa SET nombre_tce=@nombre, fecha_in=@fecha WHERE empresa.id = @id')

    if (query.rowsAffected[0]==0) {
       return res.status(404).json({message:'Empresa no encontrada'})
    }
    return res.status(200).json({message: 'Empresa actualizada correctamente'})
}
export const deleteEmpresa = async (req, res)=>{
    const idParams = req.params.id
    const pool =  await connection()
    const query = await pool.request()
    .input('id', sql.Int, idParams)
    .query('DELETE FROM empresa WHERE empresa.id = @id')    

    if (query.rowsAffected[0]==0) {
       return res.status(404).json({message:'La Empresa no puede ser eliminada'})
    }
    return res.status(200).json({message: 'Empresa eliminada correctamente'})
}