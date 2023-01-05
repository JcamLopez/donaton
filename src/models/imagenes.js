import path from "path";
import url from 'url';
import multer from "multer"
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const img = {};


img.filtro = (req, file, done) => {
    var tipos = ["imeg/jpg", "image/jpge", "imege/png"]
    if (!tipos.includes(file.mimetype)) {
        const error = new Error('tipo de dato incorrecto')
        error.code = "Limitar los tipos de archivo"
        return done(error, false)
    }

    done(false, true)
}

img.storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/server'),
    filename: (req, file, done) => {
        done(null, file.originalname);
    }
});


img.upload = multer(img.storage, img.filtro)


export default img
