// Main application logic; All the main stuff goes here I guess. 
// The project id's will be attached to DOM elements
// The app is basically just adding a list of a bunch of projects no ? 
// And the checklist I guess.

import { create_project } from "./project.js";
import { create_DOM_handler } from "../dom/dom_handler.js" 
import { create_storage_handler } from "../storage/storage_handler.js"

export function create_app(container, display_container) {
	const projects = [];
	const storage_handler = create_storage_handler(); 
	const DOM_handler = create_DOM_handler(container, display_container, storage_handler);
	const today_btn = document.getElementById("today_btn");
	
	today_btn.addEventListener("click", (e) => {
		// Should be fine; projects is in the same closure. 
		DOM_handler.display_DOM_today(projects); 	
	});

	const add_project = (name) => {
		const project = create_project(name, storage_handler); 	
		projects.push(project);
		DOM_handler.display_DOM_projects(projects);
		storage_handler.store_project(project);
		return project; 
	}
	
	const add_project_storageless = (name, id) => {
		const project = create_project(name, storage_handler, id);
		projects.push(project);
		DOM_handler.display_DOM_projects(projects); 
		return project; 
	}

	// Unused method 
	const delete_project = (project_id) => { 
		for(let i = 0; i < projects.length; i++) {
			if(projects[i].id === project_id) {
				storage_handler.remove_project(projects[i]);	
				projects.splice(i, 1);
				DOM_handler.display_DOM_projects(projects);
				return; 
			}
		}

		console.log("Could not find PROJECT for deletion!");
	}
	
	const load_data = () => {
		if(!storage_handler.has_storage()) {
			add_project("Default Project..."); 
			return; 		
		}	
			
		// Storage retrieval; First keys will be projects if we split by +, and sort by length. 
		
		const keys = []; 

		for(let i = 0; i < localStorage.length; i++) {
			keys.push(localStorage.key(i).split("+")); 
		} 
		
		keys.sort((a, b) => (a.length - b.length));
		
		for(let i = 0; i < keys.length; i++) {
			if(keys[i].length === 1) { // Project case
				const project_name = localStorage.getItem(keys[i][0]);  	
				const project = add_project_storageless(project_name, keys[i][0]);   
			} else if(keys[i].length === 2) { // Todo case
				const project_id = keys[i][0]; 
				const todo_id = keys[i][1]; 
				const data = localStorage.getItem([project_id, todo_id].join("+")); 
				
				// Get project reference; 
				let project_ref;
				for(let i = 0; i < projects.length; i++) {
					if(projects[i].id === project_id) {
						project_ref = projects[i]; 	
						break; 
					}	
				}

				const delim = "\u001F"; 	
					
				const d = data.split(delim); 
				
				project_ref.add_todo_storageless(d[0], d[1], d[2], d[3], d[4], todo_id); 
				DOM_handler.display_DOM_projects(projects); 
			}	
		}
	}

	return { projects, add_project, delete_project, load_data }; 
}
