const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const { sequelize } = require("./lib/index");
const course = require("./models/course.model");
const student = require("./models/student.model");
const studentCourse = require("./models/studentCourse.model");

// controllers students
const {
  getAllStudentsData,
  addNewStudentData,
  updateStudentData,
  deleteStudentData,
} = require("./controllers/student.controller");

// controllers  courses
const {
  getAllCoursesData,
  updateCourseData,
  addNewCourseData,
  deleteCourseData
} = require("./controllers/course.controller");

// data
const courseData = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

const studentData = [
  { name: "John Doe", age: 24 },
  { name: "Jane Doe", age: 25 },
  { name: "Sandeep Danny", age: 30 },
];

// middlewares
app.use(cors());
app.use(express.json());

// seeding data  🟢
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await student.bulkCreate(studentData);
    await course.bulkCreate(courseData);
    res.status(200).json({ message: "Data seeded successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
});

// get student data  🟢
app.get("/students", async (_, res) => {
  try {
    let response = await getAllStudentsData();
    if (!response) {
      res.status(404).json({ message: "No students found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add new student data  🟢
app.post("/students/new", async (req, res) => {
  try {
    let newStudent = req.body.newStudent;
    let response = await addNewStudentData(newStudent);

    if (response.students.length === 0) {
      return res.status(404).json({ message: "No students added" });
    } else {
      res
        .status(201)
        .json({ message: "new student data added to db", response }); // return the newly added student
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update student data  🟢
app.post("/students/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updatedStudent = req.body;
    let response = await updateStudentData(id, updatedStudent);
    if (response.students.length === 0) {
      return res.status(404).json({ message: "No students updated" });
    } else {
      res.status(200).json({ message: "student data updated", response });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete student data  🟢
app.post("/students/delete/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await deleteStudentData(id);
    if (response.students.length === 0) {
      return res.status(404).json({ message: "No students deleted" });
    } else {
      res.status(200).json({ message: "student data deleted", response });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get course data  🟢
app.get("/courses", async (_, res) => {
  try {
    let response = await getAllCoursesData();
    if (!response) {
      res.status(404).json({ message: "No courses found" });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update course data by id   📗
app.post("/courses/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updatedCourse = req.body;
    let response = await updateCourseData(id, updatedCourse);
    if (response.courses.length === 0) {
      return res.status(404).json({ message: "No courses updated" });
    } else {
      res.status(200).json({ message: "course data updated", response });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add new data to course 📗
app.post("/courses/new", async (req, res) => {
  try {
    let newCourse = req.body.newCourse;
    let response = await addNewCourseData(newCourse);

    if (response.courses.length === 0) {
      return res.status(404).json({ message: "No courses added" });
    } else {
      res.status(200).json({ message: "new course data added", response });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete  course data by id 📗
app.post("/courses/delete/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await deleteCourseData(id);
    if (response.courses.length === 0) {
      return res.status(404).json({ message: "No courses deleted" });
    } else {
      res.status(200).json({ message: "course data deleted", response });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
