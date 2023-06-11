// 0. Require the Fastify framework and instantiate it
const fastify = require("fastify")();
// Handle GET verb for / route using Fastify


//----------------------------------------------------------


let students = [
  {
  id: 1,
  last: "Last1",
  first: "First1",
  },
  {
  id: 2,
  last: "Last2",
  first: "First2",
  },
  {
  id: 3,
  last: "Last3",
  first: "First3",
  }
  ];



//-----------------------------------------------------------


//Functions
function getStudentById(id) {
  const student = students.find((st) => st.id == id);
  return student;
}

const addToStudents = (first, last) => {
  // find the largest id from the students array
  const largestId = students.reduce((prev, current) => {
    if (current.id > prev) {
      return current.id;
    }
    return prev;
  }, -1);
  // create a new student object
  const newStudent = { id: largestId + 1, first, last };
  // append the object to the students array
  students = [...students, newStudent];
  return students;
};


//-------------------------------------------------------------------

//Fastify
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});

fastify.get("/cit/student/:id", (request, reply) => {
  /* don't forget the ":" in the path to indicate that id is
  a parameter*/
  //reading the parameter from the request.params
  const { id } = request.params;
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getStudentById(id));
});

fastify.get("*", (request, reply) => {
  reply
    .code(401)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>Unsupported Route!</h1>");
});

fastify.post("/cit/student", (request, reply) => {
  // read first and last from the students' object
  const { first, last } = request.body;
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(addToStudents(first, last));
});



//-----------------------------------------------------------


// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
