'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Language } from '@/types/language';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LanguageView from './_components/language-view';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const datas: Language[] = [
	{
		id: uuidv4(),
		name: 'Javascript',
	},
	{
		id: uuidv4(),
		name: 'Python',
	},
	{
		id: uuidv4(),
		name: 'Swift',
	},
];

export default function ListesPage() {
	const [languages, setLanguages] = useState<Language[]>(datas);

	const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(event.currentTarget);
		const name = data.get('language') as string;
		setLanguages([...languages, { name, id: uuidv4() }]);
		form.reset();
	};

	const onDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id === over?.id) return;
		setLanguages((languages) => {
			const oldIndex = languages.findIndex(
				(language) => language.id === active.id
			);
			const newIndex = languages.findIndex(
				(language) => language.id === over?.id
			);

			return arrayMove(languages, oldIndex, newIndex);
		});
	};

	return (
		<div className="flex flex-col p-4 h-screen items-center">
			<h1 className="text-2xl text-center">Languages</h1>
			<div className="flex flex-col gap-4 mt-4 w-1/2">
				<form
					className=" flex gap-2"
					onSubmit={handleAddTodo}>
					<Input
						type="text"
						name="language"
						required
					/>
					<Button type="submit">Ajouter</Button>
				</form>
			</div>

			<div className="flex flex-col gap-4 mt-4 w-1/2 p-2">
				<DndContext
					onDragEnd={onDragEnd}
					modifiers={[restrictToVerticalAxis]}>
					<SortableContext items={languages}>
						{languages.map((language) => (
							<LanguageView
								key={language.id}
								language={language}
							/>
						))}
					</SortableContext>
				</DndContext>
			</div>
		</div>
	);
}
