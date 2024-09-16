const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded({extended: true}));

// routing
app.get("/", home);
app.get("/my-project", myProject);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/project/detail/:id", projectDetail);
app.get("/add-project", addProjectView);
app.post("/add-project", addProject);

const projects = [];

function home(req, res) {
  res.render("index");
}

function myProject(req, res) {
  res.render("my-project");
}

function contact(req, res) {
  res.render("contact");
}

function testimonial(req, res) {
  res.render("testimonial");
}

function projectDetail(req, res) {
  res.render("project-detail");
}

function addProjectView(req, res) {
    res.render("add-project");
}

function addProject(req, res) {
    const { project, started, completed, description, technology1, technology2, technology3, technology4 } = req.body;

    const data = {
        project,
        started,
        completed,
        description,
        technology1,
        technology2,
        technology3,
        technology4,
        author: "Abdul Rohman",
        createdAt: new Date(),
    };

    projects.unshift(data);
    console.log("isi project sekarang : ", projects);
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
