// Dom Handler to handle adding elements to the DOM. 
// Okay so; I have no idea what I am doing :). 
// BUT, I can code a binary search algorithm. So yeah take that i guess. 
// I think I am losing my mind. :)
// Ok let's focus. We need to add a project to the DOM. 
// but we need to seperate the DOM and the Application logic. 
// Ok, so we need a DOM method to display all DOM elements from an array. 

export function create_DOM_handler(container, display_container, storage_handler) {
	const todo_dialog = document.querySelector("dialog#todo");
	const todo_dialog_btn = document.querySelector("dialog#todo input#close");
	const todo_form = document.querySelector("dialog#todo form");

	if(!container) {
		console.log("Please pass a valid container!");
		return; 
	} 
	
	const date_month = (date_obj) => {
		switch(date_obj.getMonth()) {
			case 0:
				return "January";
				break; 
			case 1:
				return "Feburary";
				break;
			case 2:
				return "March";
				break; 
			case 3:
				return "April";
				break;	
			case 4:
				return "May";
				break; 
			case 5:
				return "June";
				break;
			case 6:
				return "July";
				break; 
			case 7:
				return "August";
				break;
			case 8:
				return "September";
				break; 
			case 9:
				return "October";
				break;
			case 10:
				return "November";
				break; 
			case 11:
				return "December";
				break;
		}	
	}
		
	const date_time = (date_obj) => {
		let ans = "";
		let am = true; 
		
		if(date_obj.getHours() === 0) {
			ans += 12;  
		} else if(date_obj.getHours() > 12){
			ans += (date_obj.getHours() - 12); 
			am = false;
		} else {
			ans += date_obj.getHours();
			if(date_obj.getHours() === 12) {
				am = false; 
			}
		}

		ans += ":"; 
			
		if(Math.trunc(date_obj.getMinutes() / 10) === 0) {
			ans += "0"; 
		}

		ans += date_obj.getMinutes(); 

		if(am) {
			ans += " AM"; 
		} else {
			ans += " PM";
		}

		return ans;
	}

	const display_todo = (todo_ref) => {
		// Clear previous display
		display_container.innerHTML = ''; 
		
		const todo_title = document.createElement("h1");
		todo_title.textContent = todo_ref.title;
		
		const todo_date = new Date(todo_ref.due_date);
		// We need month, date, hours, minutes. 
		const due_date = document.createElement("h4");
		due_date.textContent = "DUE: " + date_month(todo_date) + " " + todo_date.getDate() + " " + date_time(todo_date);  	

		const description = document.createElement("p");
		description.textContent = "Description: " + todo_ref.description; 
		
		const priority = document.createElement("h4");
		priority.textContent = "Priority: " + todo_ref.priority;
		
		const notes = document.createElement("p");
		notes.textContent = "Notes: " + todo_ref.notes; 
	
		display_container.append(todo_title);
		display_container.append(due_date);
		display_container.append(priority);
		display_container.append(description);
		display_container.append(notes);
	}

	const display_project = (project_ref) => {
		// Clear previous display
		display_container.innerHTML = ''; 
		
		// Display the project; 
		const project_title = document.createElement("h1");
		project_title.textContent = project_ref.name;
		
		const todo_list_container = document.createElement("form");
		const todo_list = project_ref.todo_list; 
		
		todo_list.sort((a, b) => Date(a.due_date) - Date(b.due_date)); 
		
		for(let i = 0; i < todo_list.length; i++) {
			const todo_item = document.createElement("label");
			todo_item.textContent = todo_list[i].title; 
			const check_box = document.createElement("input");
			check_box.setAttribute("type", "checkbox");
			todo_item.append(check_box);
			todo_list_container.append(todo_item);	
		} 
		
		// Add to display container;
		display_container.append(project_title);
		display_container.append(todo_list_container);
	}
	
	const create_DOM_todos = (projects, project_id) => {
		let project_ref; 
		for(let i = 0; i < projects.length; i++) {
			if(projects[i].id === project_id) {
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
				
				const todo_item = todo_ref[i]; 

				const todo_cont = document.createElement("div");
				const delete_btn = document.createElement("button");
				const todo_btn = document.createElement("button");
				const settings_btn = document.createElement("button"); 

				todo_cont.setAttribute("class", "todo");
				todo_cont.setAttribute("todo_id", todo_ref[i].id);
				delete_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';
				settings_btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cog</title><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>';  		
	

				delete_btn.addEventListener("click", (e) => {
					project_ref.delete_todo(todo_item.id); 
					todo_cont.remove();	
				});
				
				todo_btn.addEventListener("click", (e) => {
					display_todo(todo_item);
				});

				todo_btn.textContent = todo_ref[i].title; 
				
				let pressed = false; 

				settings_btn.addEventListener("click", (e) => {
					pressed = true;
					document.getElementById("todo_desc").value = todo_item.description; 	
					document.getElementById("todo_date").value = todo_item.due_date;
					document.getElementById("priority").value = todo_item.priority;
					document.getElementById("todo_name").value = todo_item.title;
					document.getElementById("todo_notes").value = todo_item.notes;
					todo_dialog.showModal(); 
				});  
				
				todo_dialog.addEventListener("cancel", (e) => {
					pressed = false; 
				}); 
				
				todo_dialog_btn.addEventListener("click", (e) => {
					if(!pressed) {
						return; 
					}	
					
					const form_data = new FormData(todo_form);
					const title = form_data.get("todo_name");
					const description = form_data.get("description"); 
					const due_date = form_data.get("due_date");
					const priority = form_data.get("priority");
					const notes = form_data.get("notes");
					
					project_ref.edit_todo(title, description, due_date, priority, notes, todo_item);
					todo_btn.textContent = todo_item.title; 
					update_todos(); 
					display_todo(todo_item);
					pressed = false; 
					e.preventDefault(); 
					todo_dialog.close(); 						
				});	

				DOM_project.append(todo_cont);
				todo_cont.append(delete_btn);
				todo_cont.append(settings_btn);
				todo_cont.append(todo_btn);
				todo_ref[i].display = true; 
			}
		}
		
		let pressed = false; 

		add_todo_btn.addEventListener("click", (e) => {
			pressed = true; 
			todo_dialog.showModal();		
		});
		
		todo_dialog.addEventListener("cancel", (e) => {
			pressed = false; 
		});  	

		todo_dialog_btn.addEventListener("click", (e) => {
			if(!pressed) {
				return;
			}
			const form_data = new FormData(todo_form);
			const title = form_data.get("todo_name");
			const description = form_data.get("description"); 
			const due_date = form_data.get("due_date");
			const priority = form_data.get("priority");
			const notes = form_data.get("notes");
			const todo_ref = project_ref.add_todo(title, description, due_date, priority, notes);
			update_todos(); 
			display_todo(todo_ref);
			pressed = false; 
			e.preventDefault(); 
			todo_dialog.close(); 
		});	

		DOM_project.append(add_todo_btn);
		update_todos(); 
	}

	const toggle_DOM_todos = (projects, project_id) => {
		let project_ref; 
		for(let i = 0; i < projects.length; i++) {
			if(projects[i].id === project_id) {
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
			
			const project_ref = projects[i];

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
							
			main_btn.addEventListener("click", (e) => {
				display_project(project_ref); 	
			});
			
			delete_btn.addEventListener("click", (e) => {
				for(let j = 0; j < projects.length; j++) {
					if(projects[j].id === project_ref.id) {
						storage_handler.remove_project(project_ref); 
						projects.splice(j, 1);
						display_DOM_projects(projects);
					}	
				}
				display_container.innerHTML = '';
				DOM_project.remove(); 	
			});
			
			drop_down.addEventListener("click", (e) => {
				if(!project_ref.todo_display) {
					create_DOM_todos(projects, project_ref.id);		
				} else {
					toggle_DOM_todos(projects, project_ref.id);	
				}
			});			

			container.append(DOM_project); 
			DOM_project.append(delete_btn);
			DOM_project.append(drop_down);
			DOM_project.append(main_btn);

			projects[i].display = true; 
		}
	}

	const display_DOM_today = (projects) => {
		// Function to display todos that are needed for today; 

		// Clear previous display
		display_container.innerHTML = ''; 
		const today_todo = []; 
		
		// Dates occur on same day, if month, year, and date are the same. 
		const check_date = (d1, d2) => {
			return (d1.getDate() === d2.getDate()) && (d1.getMonth() === d2.getMonth()) && (d1.getFullYear() === d2.getFullYear()); 
		}

		for(let i = 0; i < projects.length; i++) {
			for(let j = 0; j < projects[i].todo_list.length; j++) {
				// projects[i][j] -> Specific todo 
				const todo_list = projects[i].todo_list; 

				const current_date = new Date();  
				const todo_date = new Date(todo_list[j].due_date);

				// Date automatically initalized to current date
				if(check_date(current_date, todo_date)) {
					today_todo.push(todo_list[j]); 
				}
			}	
		}
	
		// All todos for today aquired ... Need to now display all of them
		
		const today_title = document.createElement('h1');
		today_title.textContent = "Tasks For Today"; 

		const todo_list_container = document.createElement("form");
		
		today_todo.sort((a, b) => Date(a.due_date) - Date(b.due_date)); 
		
		for(let i = 0; i < today_todo.length; i++) {
			const todo_item = document.createElement("label");
			todo_item.textContent = today_todo[i].title; 
			const check_box = document.createElement("input");
			check_box.setAttribute("type", "checkbox");
			todo_item.append(check_box);
			todo_list_container.append(todo_item);	
		} 
		
		// Add to display container;
		display_container.append(today_title);
		display_container.append(todo_list_container);
	}
	
	return { display_DOM_projects, display_DOM_today }; 
}
