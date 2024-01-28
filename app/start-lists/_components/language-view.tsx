import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Language } from '@/types/language';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableLanguageProps = {
	language: Language;
};

const LanguageView = ({ language }: SortableLanguageProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: language.id,
		});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			// {...attributes}
			// {...listeners}
			className={cn(
				'flex justify-between items-center shadow-xl rounded-lg p-4 z-0 bg-white h-16'
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

export default LanguageView;
