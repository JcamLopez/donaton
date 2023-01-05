
import multer from "multer"
import path from "path";
import pool from '../database/conexion.js';
const img = {};

const storage = multer.diskStorage({
    destination: './src/public/server',
    filename: (req, file, done) => {
        done(null, file.originalname);
    }
});

img.upload = multer({
    storage,
    dest: './src/public/server',
    fileFilter: (req, file, cb) => {
        var filetypes = /jpg|jpge|png/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb('el archivo no tiene el formato correcto')
    }
})


img.registar = (req) => {
    return new Promise(async (resolve, reject) => {
        const archivo = req.file.originalname;
        const ruta = " http://localhost:5000/server/" + archivo
        const sql = await pool.query("insert into imagen (url)values($1) RETURNING *", [ruta])
        if (sql.rowCount > 0) {
            return resolve('registro la imagen de manera correcta')
        } else {
            return reject('Error, no se registro la imgagen')
        }
    })

}

img.consultar_ultima_imagen = () => {
    return new Promise(async (resolve, reject) => {
        const ultima_persona = await pool.query('select max(id_imagen) as id from imagen');
        if (ultima_persona.rowCount > 0) {
            return resolve(ultima_persona.rows[0].id);
        } else {
            return reject('no se consulto la ultima persona')
        }
    })
}

export default img
