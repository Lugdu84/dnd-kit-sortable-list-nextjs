'use client';

import { DndContext, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import Droppable from './_components/droppable';
import Draggable from './_components/draggable';
import { useState } from 'react';

export default function DroppablePage() {
	const onDragEnd = (event: DragEndEvent) => {
		const { over } = event;
		setParent(over ? over.id : null);
	};
	const [parent, setParent] = useState<UniqueIdentifier | null>(null);

	const item = <Draggable />;
	return (
		<div className="flex h-screen justify-center items-center">
			<DndContext onDragEnd={onDragEnd}>
				<div className="w-1/2">{parent === null ? item : null}</div>
				<Droppable>{parent !== null ? item : null}</Droppable>
			</DndContext>
		</div>
	);
}
