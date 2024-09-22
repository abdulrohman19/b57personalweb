const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(config.development);

const projectModel = require('./models').project;

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

  let query = `SELECT * FROM public.projects WHERE id=${id}`;
  let result = await sequelize.query(query, {type: QueryTypes.SELECT});

  if (!result.length) return res.render("Not-found");
  
    query = `DELETE FROM public.projects WHERE id=${id}`;
    result = await sequelize.query(query, { type: QueryTypes.DELETE });
    res.redirect("/my-project-new");
  
}

async function editProjectView(req, res) {
  const {id} = req.params;

  const query = `SELECT * FROM public.projects WHERE id=${id}`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT});

  if (!result.length) return res.render("Not-found");

  res.render("edit-project", { data: result[0] });
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

  const query = `UPDATE public.projects SET project='${project}', description='${description}' WHERE id=${id}`;
  await sequelize.query(query, {type: QueryTypes.UPDATE});

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

  const query = `INSERT INTO public.projects(project, description, upload, "createdAt", "updatedAt") VALUES('${project}', '${description}', 'https://downloadwap.com/thumbs2/wallpapers/2022/p2/abstract/48/bbrbbf78.jpg', now(), now())`;

  await sequelize.query(query, {type: QueryTypes.INSERT});

  res.redirect("/my-project-new");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
