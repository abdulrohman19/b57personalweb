const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const projectModel = require('./models').project;
const userModel = require("./models").user;
 
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(express.urlencoded({ extended: true }));

// routing
app.get("/", home);
app.get("/my-project", myProject);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/project-detail/:id", projectDetail);
app.get("/my-project-new", myProjectNew);
app.get("/delete-project/:id", deleteProject);
app.get("/edit-project/:id", editProjectView);
app.post("/edit-project/:id", editProject);
app.get("/add-project", addProjectView);
app.post("/add-project", addProject);

//auth & authorization
app.get("/login", loginView);
app.get("/register", registerView);

app.post("/register" ,register);
app.post("/login", login);

function loginView (req, res) {
  res.render("login");
}

function login(req, res) {

}

function registerView (req, res) {
  res.render("register");
}

async function register(req, res) {
  const {name, email, password} = req.body   

  await userModel.create({
    name: name,
    email: email,
    password: password,
  });

  res.redirect("/");
}

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

async function projectDetail(req, res) { 
  const { id } = req.params;
  const result = await projectModel.findOne({
    where: {
      id: id,
    },
  });

  console.log("detail", result);

  if (!result) return res.render("Not-found");
    res.render("project-detail", { data : result });
}

function addProjectView(req, res) {
  res.render("add-project");
}

async function myProjectNew(req, res) {
  const result = await projectModel.findAll();

  console.log(result);

  res.render("my-project-new", { data: result });
}

async function deleteProject(req, res) {
  const { id } = req.params;

  let result = await projectModel.findOne({
    where: {
      id: id,
    },
  });

  if (!result) return res.render("Not-found");
  
    await projectModel.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/my-project-new");
  
}

async function editProjectView(req, res) {
  const {id} = req.params;

  const result = await projectModel.findOne({
    where: {
      id: id,
    },
  });

  if (!result) return res.render("Not-found");

  res.render("edit-project", { data: result});
}

async function editProject(req, res) {
  const {id} = req.params;
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

  const eproject = await projectModel.findOne({
    where: {
      id: id,
    },
  });

  if (!eproject) return res.render("Not-found");

  eproject.project = project;
  eproject.description = description;

  await eproject.save(); 

  res.redirect("/my-project-new")
}

async function addProject(req, res) {
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
  
  await projectModel.create({
    project: project,
    description: description,
    upload: "https://downloadwap.com/thumbs2/wallpapers/2022/p2/abstract/48/bbrbbf78.jpg"
  });

  res.redirect("/my-project-new");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
