// Object to handle storage of data, and retrieval of data from storage; Not really an object, just a set of functions. 
// Okay so we can only store key value pairs of strings ? 
// We need to store the basic data; Like name, id. 
// We also need a function that recreates objects based on this info; 
// We should steal this from the project.js file and the todo.js file. 
// We also need to create a DOM_method to load all this from the data.
// But for displays sake, we should set it to false :P . 
// We also need to add the populate storage method every time
// We add an element in the app object. 
// So we just need to be able to store 1 project, and 1 todo in a project. 

export function create_storage_handler() {
	const can_store = (type) => {
		let storage; 
		try {
			storage = window[type]; 
			const t = "__storage_test"; 
			storage.setItem(t, t);
			storage.removeItem(t);
			return true; 
		} catch (e) {
			return (
				e instanceof DOMException &&
				e.name === "QuotaExceededError" && 
				storage && 
				storate.length !== 0
			);
		}
	}
	
	const sanitize_data = (data) => {
		return data.replace(/\u001F/g, "");
	} 

	const store_todo = (project_id, todo) => {
		if(!can_store("localStorage")) {
			console.log("Cannot use Local Storage!");
			return; 
		}
		
		const storage_key = project_id + "+" + todo.id; 
		const delim = "\u001F";
		
		for(const key in todo) {
			if(key === "display" || key === "id") {
				continue; 
			}
			if(todo.hasOwnProperty(key)) {
				todo[key] = sanitize_data(todo[key]); 		
			}
		}

		const data = [todo.title, todo.description, todo.due_date, todo.priority, todo.notes].join(delim);
		
		localStorage.setItem(storage_key, data);	
	}
		
	const edit_todo = (project_id, todo) => {
		const storage_key = project_id + "+" + todo.id; 
		if(!localStorage.getItem(storage_key)) {
			console.log("Cannot find key to edit!");
			return; 
		}
		
		const delim = "\u001F"; 
		const new_data = [todo.title, todo.description, todo.due_date, todo.priority, todo.notes].join(delim);
		localStorage.setItem(storage_key, new_data);	
	} 

	const remove_todo = (project_id, todo) => {
		const storage_key = project_id + "+" + todo.id; 

		localStorage.removeItem(storage_key);  
	}

	const store_project = (project) => {
		if(!can_store("localStorage")) {
			console.log("Cannot use Local Storage!");
			return; 
		}
		
		const storage_key = project.id;		
		localStorage.setItem(storage_key, project.name);
	}

	const remove_project = (project) => {
		const project_key = project.id; 
		localStorage.removeItem(project_key);
		
		const todo_list = project.todo_list; 
		
		for(let i = 0; i < todo_list.length; i++) {
			remove_todo(project.id, todo_list[i]);  		
		}
	}
	
	const has_storage = () => {
		return (localStorage.length !== 0); 
	}

	return { store_todo, remove_todo, store_project, remove_project, has_storage, edit_todo }; 
}

