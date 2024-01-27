import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

export default function Draggable() {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: 'draggable',
	});
	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<Button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}>
			Go ahead, drag me
		</Button>
	);
}
