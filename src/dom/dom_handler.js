// Dom Handler to handle adding elements to the DOM. 
// Okay so; I have no idea what I am doing :). 
// BUT, I can code a binary search algorithm. So yeah take that i guess. 
// I think I am losing my mind. :)
// Ok let's focus. We need to add a project to the DOM. 
// but we need to seperate the DOM and the Application logic. 
// Ok, so we need a DOM method to display all DOM elements from an array. 

export function create_DOM_handler(container) {
	if(!container) {
		console.log("Please pass a valid container!");
		return; 
	}

	const display_DOM_todos = (projects, project_id) => {
	
	}

	const hide_DOM_todos = (projects, project_id) => {
			
	}

	const display_DOM_projects = (projects) => {
		for(let i = 0; i < projects.length; i++) {
			if(projects[i].display === true) {
				continue; 
			}
			
			const DOM_project = document.createElement("div");
			const delete_btn = document.createElement("button");
			const drop_down = document.createElement("button");
			const main_btn = document.createElement("button");

			DOM_project.setAttribute("class", "project");
			DOM_project.setAttribute("project_id", projects[i].id);
			main_btn.textContent = projects[i].name; 
			delete_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'; 
			drop_down.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-down</title><path d="M7,10L12,15L17,10H7Z" /></svg>'; 
							
			
			delete_btn.addEventListener("click", (e) => {
				const id = e.currentTarget.parentElement.getAttribute("project_id"); 
				for(let j = 0; j < projects.length; j++) {
					if(projects[j].id === id) {
						projects.splice(j, 1);
						display_DOM_projects(projects);
					}	
				}
				DOM_project.remove(); 	
			});

			container.append(DOM_project); 
			DOM_project.append(delete_btn);
			DOM_project.append(drop_down);
			DOM_project.append(main_btn);

			projects[i].display = true; 
		}
	}

	return { display_DOM_projects, display_DOM_todos, hide_DOM_todos }; 
}
