// Dom Handler to handle adding elements to the DOM. 
// Okay so; I have no idea what I am doing :). 
// BUT, I can code a binary search algorithm. So yeah take that i guess. 
// I think I am losing my mind. :)
// Ok let's focus. We need to add a project to the DOM. 
// but we need to seperate the DOM and the Application logic. 
// Ok, so we need a DOM method to display all DOM elements from an array. 

export function create_DOM_handler(container) {
	const todo_dialog = document.querySelector("dialog#todo");
	const todo_dialog_btn = document.querySelector("dialog#todo input#close");
	const todo_form = document.querySelector("dialog#todo form");

	if(!container) {
		console.log("Please pass a valid container!");
		return; 
	}

	const create_DOM_todos = (projects, project_id) => {
		let project_ref; 
		for(let i = 0; i < projects.length; i++) {
			if(projects[i].id == project_id) {
				project_ref = projects[i]; 
				break; 
			}
		}
		project_ref.todo_display = true; 	
		const add_todo_btn = document.createElement("button");
		const DOM_project = document.querySelector("div.project[project_id = '"+project_id+"']");
		add_todo_btn.setAttribute("id", "svg_btn");
		add_todo_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path></svg>Add TODO';
		add_todo_btn.setAttribute("class", "addition");
		
		const update_todos = () => {
			const todo_ref = project_ref.todo_list; 
			
			for(let i = 0; i < todo_ref.length; i++) {
				if(todo_ref[i].display === true) {
					continue; 
				}
				const todo_cont = document.createElement("div");
				const delete_btn = document.createElement("button");
				const todo_btn = document.createElement("button");
				
				todo_cont.setAttribute("class", "todo");
				todo_cont.setAttribute("todo_id", todo_ref[i].id);
				delete_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
				
				delete_btn.addEventListener("click", (e) => {
					const parent_elem = e.currentTarget.parentElement;
					const todo_id = parent_elem.getAttribute("todo_id");

					project_ref.delete_todo(todo_id); 
					parent_elem.remove();
				});
				
				todo_btn.textContent = todo_ref[i].title; 
				
				DOM_project.append(todo_cont);
				todo_cont.append(delete_btn);
				todo_cont.append(todo_btn);
				todo_ref[i].display = true; 
			}
		}

		add_todo_btn.addEventListener("click", (e) => {
			todo_dialog.showModal();		
			update_todos(); 	
		});
		
		todo_dialog_btn.addEventListener("click", (e) => {
			const form_data = new FormData(todo_form);
			const title = form_data.get("todo_name");
			const description = form_data.get("description"); 
			const due_date = form_data.get("due_date");
			const priority = form_data.get("priority");
			const notes = form_data.get("notes");
			project_ref.add_todo(title, description, due_date, priority, notes);
			update_todos(); 
			e.preventDefault(); 
			todo_dialog.close(); 
		});	

		DOM_project.append(add_todo_btn);
		update_todos(); 
	}

	const toggle_DOM_todos = (projects, project_id) => {
		let project_ref; 
		for(let i = 0; i < projects.length; i++) {
			if(projects[i].id == project_id) {
				project_ref = projects[i]; 
				break; 
			}
		}
		
		const DOM_project_selector = "div.project[project_id = '"+project_id+"']";
		const add_todo_btn = document.querySelector(DOM_project_selector + " button#svg_btn");
		
		add_todo_btn.classList.toggle("hidden");

		const todo_ref = project_ref.todo_list; 
		
		for(let i = 0; i < todo_ref.length; i++) {
			const todo_cont = document.querySelector(DOM_project_selector + " div.todo[todo_id = '"+todo_ref[i].id+"']");			
			todo_cont.classList.toggle("hidden"); 
		}
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
			drop_down.setAttribute("id", "drop_btn");
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
			
			drop_down.addEventListener("click", (e) => {
				const id = e.currentTarget.parentElement.getAttribute("project_id"); 
				for(let j = 0; j < projects.length; j++) {
					if(projects[j].id !== id) {
						continue;
					}
					if(!projects[j].todo_display) {
						create_DOM_todos(projects, id);		
					} else {
						toggle_DOM_todos(projects, id);	
					}
				}	
			});			

			container.append(DOM_project); 
			DOM_project.append(delete_btn);
			DOM_project.append(drop_down);
			DOM_project.append(main_btn);

			projects[i].display = true; 
		}
	}

	return { display_DOM_projects, create_DOM_todos, toggle_DOM_todos }; 
}
