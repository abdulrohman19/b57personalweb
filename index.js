const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const config = require("./config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(config.development)

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

const data = [];

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

  const query = `SELECT * FROM public.projects WHERE id=${id}`;
  const result = await sequelize.query(query, {type: QueryTypes.SELECT});

  console.log("result", result);
  console.log("result length", result.length)

  if (!result.length) {
    res.render("Not-found");
  } else {
    res.render("project-detail", { data : result[0] });
  }
}

function addProjectView(req, res) {
  res.render("add-project");
}

async function myProjectNew(req, res) {
  const query = `SELECT * FROM public.projects`;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });

  // console.log(result)
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
  const result = await sequelize.query(query, {type: QueryTypes.UPDATE});

  console.log("Update berhasil", result);

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

  const result = await sequelize.query(query, {type: QueryTypes.INSERT});

  console.log("Data berhasil ditambahkan", result);
  //  data.push(
  //   {
  //     project,
  //     started, 
  //     completed,
  //     description,
  //     technology1,
  //     technology2,
  //     technology3,
  //     technology4,
  //     upload: "https://wow.fan/cdn/shop/files/15452-image-1_89b0ff6b-c324-46ce-ac84-ecaf872b2cab.jpg?v=1726126407",
  //     author: "Abdul Rohman",
  //     createdAt: new Date(),
  //   }
  //  );

  // data.unshift(data);
  res.redirect("/my-project-new");
  // console.log("isi project sekarang : ", data);
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
