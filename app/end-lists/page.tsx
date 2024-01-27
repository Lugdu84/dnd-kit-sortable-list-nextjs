'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
	DndContext,
	DragEndEvent,
	UniqueIdentifier,
	closestCenter,
} from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	restrictToFirstScrollableAncestor,
} from '@dnd-kit/modifiers';
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Language = {
	id: string;
	name: string;
};

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

type SortableLanguageProps = {
	language: Language;
	isActive: boolean;
};

const SortableTodo = ({ language, isActive }: SortableLanguageProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: language.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			style={style}
			// {...listeners}
			className={cn(
				'flex justify-between items-center shadow-xl rounded-lg p-4 z-0 bg-white h-16 cursor-grab',
				isActive && 'z-50 bg-gray-100 cursor-grabbing'
			)}>
			<span>{language.name}</span>
			<Button
				variant={'outline'}
				{...listeners}>
				<svg
					viewBox="0 0 20 20"
					width="12">
					<path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
				</svg>
			</Button>
		</div>
	);
};

export default function StartListPage() {
	const [languages, setLanguages] = useState<Language[]>(datas);
	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

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
		if (active.id === over?.id) {
			setActiveId(null);
			return;
		}
		console.log('on End');
		setLanguages((languages) => {
			const oldIndex = languages.findIndex((todo) => todo.id === active.id);
			const newIndex = languages.findIndex((todo) => todo.id === over?.id);
			return arrayMove(languages, oldIndex, newIndex);
		});
		setActiveId(null);
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
					modifiers={[
						restrictToVerticalAxis,
						restrictToFirstScrollableAncestor,
					]}
					collisionDetection={closestCenter}
					onDragStart={(event) => setActiveId(event.active.id)}
					onDragCancel={() => setActiveId(null)}
					onDragEnd={onDragEnd}>
					<SortableContext
						items={languages}
						strategy={verticalListSortingStrategy}>
						{languages.map((language) => (
							<SortableTodo
								isActive={activeId === language.id}
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
