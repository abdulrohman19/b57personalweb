const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded({ extended: true }));

// routing
app.get("/", home);
app.get("/my-project", myProject);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/project-detail/:index", projectDetail);
app.get("/my-project-new", myProjectNew);
app.get("/delete-project/:index", deleteProject);
app.get("/edit-project/:index", editProjectView);
app.post("/edit-project/:index", editProject);
app.get("/add-project", addProjectView);
app.post("/add-project", addProject);

const data = [
  {
    project: "1",
    started: "1",
    completed: "1",
    description: "1",
    technology1: "1",
    technology2: "1",
    technology3: "1",
    technology4: "1",
    upload: "https://wow.fan/cdn/shop/files/15452-image-1_89b0ff6b-c324-46ce-ac84-ecaf872b2cab.jpg?v=1726126407",
    author: "Abdul Rohman",
    createdAt: new Date(),
  },
 
  {
    project: "2",
    started: "2",
    completed: "2",
    description: "2",
    technology1: "2",
    technology2: "2",
    technology3: "2",
    technology4: "2",
    upload: "https://wow.fan/cdn/shop/files/15452-image-1_89b0ff6b-c324-46ce-ac84-ecaf872b2cab.jpg?v=1726126407",
    author: "Abdul Rohman",
    createdAt: new Date(),
  },
];

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

function myProjectNew(req, res) {
  res.render("my-project-new", { data });
}

function deleteProject(req, res) {
  const index = req.params.index;
  data.splice(index, 1);

  res.redirect("/my-project-new");
}

function editProjectView(req, res) {
  const index = req.params.index;

  res.render("edit-project", { data: data[index], index: index });
}

function editProject(req, res) {
  const index = req.params.index;
  const { 
    project,
    started,
    completed,
    description,
    technology1,
    technology2,
    technology3,
    technology4,
    upload } = req.body;
  
  data[index] = {
    project: project,
    started: started,
    completed: completed,
    description: description,
    technology1: technology1,
    technology2: technology2,
    technology3: technology3,
    technology4: technology4,
    upload: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEwUXjA07nw_RSgSyV_KCvBjy8LKHoA2m9uA&s",
    author: "Abdul Rohman",
    createdAt: new Date(),
  };

  res.redirect("/my-project-new")
}

function addProject(req, res) {
  const {
    project,
    started,
    completed,
    description,
    technology1,
    technology2,
    technology3,
    technology4,
    upload,
  } = req.body;

  const data = {
    index: index,
    project,
    started,
    completed,
    description,
    technology1,
    technology2,
    technology3,
    technology4,
    upload,
    author: "Abdul Rohman",
    createdAt: new Date(),
  };

  data.unshift(data);
  res.redirect("/my-project-new");
  // console.log("isi project sekarang : ", data);
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
