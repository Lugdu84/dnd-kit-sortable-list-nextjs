'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
	id: string;
	title: string;
	completed: boolean;
};

export default function ListesPage() {
	let id = 0;
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(event.currentTarget);
		const title = data.get('todo') as string;
		id = id + 1;
		setTodos([...todos, { title, completed: false, id: uuidv4() }]);
		form.reset();
	};

	console.log('todos', todos);
	return (
		<div className="flex flex-col justify-center p-4">
			<form
				className=" flex gap-2"
				onSubmit={handleAddTodo}>
				<Input
					type="text"
					name="todo"
				/>
				<Button type="submit">Ajouter</Button>
			</form>
		</div>
	);
}
