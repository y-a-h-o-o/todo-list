import "./styles.css";
import { create_app } from "./data/app.js";

// required 
console.log("Hallo :3");

// insert parent continaer here
const parent_container = document.querySelector("aside");

// Buttons :)
const project_btn = document.querySelector("aside > :nth-child(2)");

// Application creation
const app = create_app(parent_container);
app.add_project("Empty!");

project_btn.addEventListener("click", (e) => {
	app.add_project("Test");
	console.log(app.projects);
});


