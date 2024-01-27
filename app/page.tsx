import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center gap-3  p-24">
			<Link href="/end-lists">Projet fini</Link>
			<Link href="/start-lists">Début du projet</Link>
			<Link href="/droppable">Droppable</Link>
		</main>
	);
}
