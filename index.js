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

function home(request, response) {
  response.render("index");
}

app.get("/my-project", myProject);

function myProject(request, response) {
  response.render("my-project");
}

// app.post("/my-project", myProject);
// function myProject(request, response) {
//   console.log("Sukses post form");
// }

app.get("/contact", contact);
function contact(request, response) {
  response.render("contact");
}

app.get("/testimonial", testimonial);
function testimonial(request, response) {
  response.render("testimonial");
}

app.get("/project-detail", projectDeatil);
function projectDeatil(request, response) {
  response.render("project-detail");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
