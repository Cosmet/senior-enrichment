const { db, Campus, Student } = require('./db/models');
const avatar = require('cartoon-avatar');
const chance = require('chance')(Math.floor((Math.random() * 10) + 1));

const numStudents = 200;

let emails = ['@gmail.com', '@yahoo.com', '@aol.com', '@hotmail.com', '@msn.com', '@fullstack.com']

let students = [];

const campuses = [{
  name: 'Columbia University',
  image: '/images/columbia.jpg'
}, {
  name: 'Harvard University',
  image: '/images/harvard.png'
}, {
  name: 'Massachusetts Institute of Technology',
  image: '/images/mit.png'
}, {
  name: 'Northwestern University',
  image: '/images/nwu.png'
}, {
  name: 'Princeton University',
  image: '/images/princeton.png'
}, {
  name: 'University of Chicago',
  image: '/images/uofc.jpg'
}, {
  name: 'Illinois Institute of Technology',
  image: '/images/iit.png'
}, {
  name: 'Roosevelt University',
  image: '/images/roosevelt.png'
}, {
  name: 'Yale University',
  image: '/images/yale.png'
}, {
  name: 'Stanford University',
  image: '/images/stanford.jpg'
}, {
  name: 'University of Pennsylvania',
  image: '/images/penn.gif'
}, {
  name: 'Duke University',
  image: '/images/duke.png'
}];

function randPhoto (gender) {
  gender = gender.toLowerCase();
  var id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return avatar.generate_avatar({ gender: gender, id: id });
}

function createStudents() {
  while (students.length < numStudents) {
    const gender = chance.gender();
    const randEmail = Math.floor(Math.random() * emails.length - 1) + 1;
    const campusId = Math.floor(Math.random() * campuses.length) + 1;
    const name = [chance.first({gender: gender}), chance.last()].join(' ');
    const email = name.split(' ').join('') + emails[randEmail];
    const newStudent = { name: name, email: email, campusId: campusId, image: randPhoto(gender) }
    if (!students.find((student) => student.name === name)) students.push(newStudent);
  }
}

createStudents();

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
    Promise.all(students.map(student =>
      Student.create(student))
    )
  );

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
