import { useDroppable } from '@dnd-kit/core';

type DroppableProps = {
	children: React.ReactNode;
};

export default function Droppable({ children }: DroppableProps) {
	const { isOver, setNodeRef } = useDroppable({
		id: 'droppable',
	});
	const style = {
		color: isOver ? 'green' : undefined,
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			className=" w-96 h-52 bg-green-500 flex justify-center items-center rounded-sm">
			{children}
		</div>
	);
}
