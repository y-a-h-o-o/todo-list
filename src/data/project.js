import { create_todo } from "./todo.js";

// Projects -> Just a container for TODOs. 
// Can store multiple TODOs. Can be added or deleted. Should this be handled by the project itself ?
// Has a unique name. 
// Has a DOM function to show all TODOs ? Or put that in a seperate JS file ?
// idk :/ , 


export function create_project(name, storage_handler, id = crypto.randomUUID()) {
	const todo_list = [];
	const display = false; 
	const todo_display = false; 

	const delete_todo = (todo_id) => {
		for(let i = 0; i < todo_list.length; i++) {
			if(todo_list[i].id === todo_id) {
				storage_handler.remove_todo(id, todo_list[i]); 
				todo_list.splice(i, 1);
				return;  
			}	
		}
	
		console.log("Could not find TODO for deletion!");
	}
	
	const add_todo = (title, description, due_date, priority, notes) => {
		const todo = create_todo(title, description, due_date, priority, notes);
		todo_list.push(todo); 
		storage_handler.store_todo(id, todo); 
		return todo; 
	}
	
	const add_todo_storageless = (title, description, due_date, priority, notes, id) => {
		const todo = create_todo(title, description, due_date, priority, notes, id);
		todo_list.push(todo); 
		return todo; 
	}

	return { display, todo_display, id, name, todo_list, delete_todo, add_todo, add_todo_storageless }; 
}
