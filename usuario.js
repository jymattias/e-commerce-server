import express from 'express';

function createRouter(db) {
    const router = express.Router();
    const owner = '';
  
    // the routes are defined here
  
    //agrega un nuevo usuario
    router.post('/usuario', (req, res, next) => {
      db.query(
        'INSERT INTO usuarios (nombre, apellido, email, password, fechaNacimiento, telefono) VALUES (?,?,?,?,?,?)',
        [req.body.nombre, req.body.apellido, req.body.email, req.body.password, req.body.fechaNacimiento, req.body.telefono],
        (error) => {
          if (error) {
            console.error(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
      );
    });
  
    //obtiene todos los usuarios
    router.get('/usuario', function (req, res, next) {
      db.query(
        'SELECT * FROM usuarios',
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
    });
  
    //obtiene un usuario
    router.get('/usuario/:id', function (req, res, next) {
      db.query(
        'SELECT idUsuario, nombre, apellido, email, password, fechaNacimiento, telefono FROM usuarios WHERE idUsuario=?',
        [req.params.id],
        (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json(results);
          }
        }
      );
    });
  
    //edita un usuario por id
    router.put('/usuario/:id', function (req, res, next) {
      db.query(
        'UPDATE usuarios SET nombre=?, apellido=?, email=?, password=?, fechaNacimiento=?, telefono=? WHERE idUsuario=?',
        [req.body.nombre, req.body.apellido, req.body.email, req.body.password, req.body.fechaNacimiento, req.body.telefono, req.params.id],
        (error) => {
          if (error) {
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
      );
    });
  
    //borra un usuario por id
    router.delete('/usuario/:id', function (req, res, next) {
      db.query(
        'DELETE FROM usuarios WHERE idUsuario=?',
        [req.params.id],
        (error) => {
          if (error) {
            res.status(500).json({status: 'error'});
          } else {
            res.status(200).json({status: 'ok'});
          }
        }
      );
    });
  
    //---------------------------------------------------------------------------//
    return router;
}
export default createRouter;