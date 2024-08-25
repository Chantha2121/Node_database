import { json, Router } from "express";
import pool from "../db/db_connection.js";
const userRouter = Router();

userRouter.get('/getUser', (req, res) => {
    pool.query(`SELECT * FROM tbl_user`,(err, result)=>{
        if(err) {
            throw err;
        }
        res.send(result);;
    })
})

userRouter.post('/addUser',(req, res)=>{
    const { name, gender } = req.body;
    const sql = 'INSERT INTO tbl_user (name, gender) VALUES (?, ?)';
    const values = [name, gender];
    pool.query(sql,values,(err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json({
            message: `Added Data is successfully`,
        })
    })
})

userRouter.put('/updateUser/:id', (req, res)=>{
    const id = req.params.id;
    const {name, gender} = req.body;
    let sql = `UPDATE tbl_user SET name = ?, gender = ? WHERE id = ?`
    const values = [name, gender, id]
    pool.query(sql, values, (err, result) =>{
        if(err){
            throw err;
        }
        res.status(200).json({
            massage: `Updated successfully id = ${id}`,
            data: {
                id: id,
                affectedRows: result.affectedRows
            }
        })
    })
})

userRouter.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    let sql = `DELETE FROM tbl_user WHERE id = ${id}`;
    pool.query(sql, (err,result) =>{
        if(err){
            throw err;
        }
        res.status(200).json({
            message: `Delete successfully`,
            data: {
                id: id,
                affectedRows: result.affectedRows
            }
        })
    })
})
export default userRouter;