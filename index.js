const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "./views"));

app.use("/assets", express.static(path.join(__dirname, "assets")));

// routing
app.get("/", (request, response) => {
    response.render("index")
});
app.get("/about", (request, response) => {
    response.send("About me")
});
app.listen(port, () =>{
    console.log(`Server berjalan di port ${port}`)
});