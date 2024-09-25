const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const {Sequelize, QueryTypes} = require("sequelize");
const config = require("./config/config.json")

const sequelize = new Sequelize(config.development);

const projectModel = require('./models').project;
const userModel = require("./models").user;
 
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
  name: "my-session",
  secret: "sSvGA0mjZV",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge : 1000 * 60 * 60 * 24
  }
}))
app.use(flash());


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

async function login(req, res) {
  try {
    const { email, password } = req.body;   

  const user = await userModel.findOne({
    where: {
      email: email
    }
  })
  if (!user) {
    req.flash("error", "Email or Password is Wrong!");
    return res.redirect("/login");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    req.flash("error", "Email or Password is Wrong!");
    return res.redirect("/login");
  }

  req.session.user = user;

  req.flash("success", "Login Success!");

  res.redirect("/");
  } catch(error) {
    req.flash("error", "Something went wrong!");
    res.redirect("/");
  }
  }

function registerView (req, res) {
  res.render("register");
}

async function register(req, res) {
  try {
    const {name, email, password} = req.body;   

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    
    req.flash("success", "Register Success!");
    res.redirect("/login");
  } catch(error) {
    req.flash("error", "Register Failed!");
    res.redirect("/register");
  }
 }
 

function home(req, res) {
  console.log(req.session);
  const user = req.session.user;

  res.render("index", { user });
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
  // const result = await projectModel.findAll();
  const query = `SELECT public.projects.*, public.users.name FROM public.projects INNER JOIN public.users 
  ON public.projects."userId" = public.users.id;`;
  const result = await sequelize.query(query, {type: QueryTypes.SELECT });

  const user = req.session.user;

  res.render("my-project-new", { data: result, user });
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
