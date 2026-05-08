import type { Picture } from 'vite-imagetools';
import { COLLECTION_KEYS, type Collection } from './config';

const modules = import.meta.glob<{ default: Picture }>('./assets/img/**/*.jpg', {
	eager: true,
	query: { enhanced: true }
});

type Manifest = Record<Collection, Picture[]>;

export const images: Manifest = COLLECTION_KEYS.reduce((acc, c) => {
	const entries = Object.entries(modules)
		.filter(([path]) => path.includes(`/img/${c}/`))
		.sort(([a], [b]) => {
			const na = Number(a.match(/(\d+)\.jpg$/)?.[1] ?? 0);
			const nb = Number(b.match(/(\d+)\.jpg$/)?.[1] ?? 0);
			return na - nb;
		})
		.map(([, mod]) => mod.default);
	acc[c] = entries;
	return acc;
}, {} as Manifest);

export function pick(c: Collection, n: number) {
	const arr = images[c];
	return arr[(n - 1) % arr.length];
}
