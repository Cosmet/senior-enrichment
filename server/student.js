const router = require('express').Router();
const db = require('../db');
const { Student } = require('../db/models/')

module.exports = router;

router.get('/', function (req, res, next) {
  Student.findAll({ order: [ ['id', 'ASC'] ]})
    .then(students => res.json(students))
    .catch(next);
});

router.get('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      return res.json(student)}
    )
    .catch(next);
});

router.post('/', function (req, res, next) {
  Student.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      campusId: req.body.campusId
    }
  })
    .then(student => res.json(student))
    .catch(next);
});

router.put('/:studentId', function (req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next);
});

router.delete('/:studentId', function (req, res, next) {
  Student.destroy({
    where: {
      id: req.params.studentId
    }
  })
    .then(() => res.status(204).end())
    .catch(next);
});
