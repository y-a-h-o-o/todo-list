// Main application logic; All the main stuff goes here I guess. 
// The project id's will be attached to DOM elements
// The app is basically just adding a list of a bunch of projects no ? 
// And the checklist I guess.

import { create_project } from "./project.js";
import { create_DOM_handler } from "../dom/dom_handler.js" 

export function create_app(container) {
	const projects = [];
	const handler = create_DOM_handler(container);

	const add_project = (name) => {
		const project = create_project(name); 	
		projects.push(project);
		handler.display_DOM_projects(projects);
	};
	
	const delete_project = (project_id) => { 
		for(let i = 0; i < projects.length; i++) {
			if(projects[i].id = project_id) {
				projects.splice(i, 1);
				handler.display_DOM_projects(projects);
				return; 
			}
		}

		console.log("Could not find PROJECT for deletion!");
	};
	
	return { projects, add_project, delete_project }; 
}
