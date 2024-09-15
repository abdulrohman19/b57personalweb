const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

// routing
app.get("/", (request, response) => {
    response.render("index");
});
app.get("/my-project", (request, response) => {
    response.render("my-project");
});
app.get("/contact", (request, response) => {
    response.render("contact");
});
app.get("/testimonial", (request, response) => {
    response.render("testimonial");
});
app.get("/project-detail", (request, response) => {
    response.render("project-detail");
});
app.listen(port, () =>{
    console.log(`Server berjalan di port ${port}`);
});