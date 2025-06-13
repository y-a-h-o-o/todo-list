import "./styles.css";
import { create_app } from "./data/app.js";

// required 
console.log("Hallo :3");

// insert parent continaer here
const parent_container = document.querySelector("aside");

// Dialog :) 
const project_dialog = document.querySelector("dialog#project"); 

// Buttons :))
const project_btn = document.querySelector("aside > :nth-child(2)");
const project_dialog_btn = document.querySelector("dialog#project input#close");

// Form 
const project_form = document.querySelector("dialog#project form");

// Application creation
const app = create_app(parent_container);
app.add_project("Default Project...");

project_btn.addEventListener("click", (e) => {
	project_dialog.showModal(); 	
});

project_dialog_btn.addEventListener("click", (e) => {
	const form_data = new FormData(project_form); 
	app.add_project(form_data.get("project_name"));
	e.preventDefault(); 
	project_dialog.close(); 
});
