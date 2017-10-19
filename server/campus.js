const router = require('express').Router();
const db = require('../db');
const { Campus } = require('../db/models/')
module.exports = router;

router.get('/', function (req, res, next) {
  Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
});

router.get('/:campusId', function (req, res, next) {
  Campus.findById(req.params.campusId)
    .then(campus => res.json(campus))
    .catch(next);
});

router.post('/', function (req, res, next) {
  Campus.findOrCreate({
    where: {
      name: req.body.name,
      image: req.body.image
    }
  })
    .then(campus => res.json(campus))
    .catch(next);
});

router.put('/:campusId', function (req, res, next) {
  Campus.findById(req.params.campusId)
    .then(campus => campus.update(req.body))
    .then(campus => res.send(campus))
    .catch(next);
});

router.delete('/:campusId', function (req, res, next) {
  Campus.destroy({
    where: {
      id: req.params.campusId
    }
  })
    .then(() => res.status(204).end())
    .catch(next);
});
