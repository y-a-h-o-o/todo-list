// TODOs have title, description, due date, priority. notes 
// they can be added or deleted => need a id for each one. 
// priority => (1 - 5), set a different color for each. 
// How are date and time going to be passed ?
// Should notes be passed as an array of values ?

export function create_todo(title, description, due_date, priority, notes) {
	const id = crypto.randomUUID();
	const display = false; 
	return { display, id, title, description, due_date, priority, notes }; 	
}
