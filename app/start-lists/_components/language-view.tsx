import { cn } from '@/lib/utils';
import { Language } from '@/types/language';

type SortableLanguageProps = {
	language: Language;
};

const LanguageView = ({ language }: SortableLanguageProps) => {
	return (
		<div
			className={cn(
				'flex justify-between items-center shadow-xl rounded-lg p-4 z-0 bg-white h-16'
			)}>
			<span>{language.name}</span>
		</div>
	);
};

export default LanguageView;
