export const CDN_BASE = 'https://cdn.imgipsum.com';

export const SIZES = [100, 200, 400, 800, 1200, 1600] as const;
export const FORMATS = ['webp', 'avif', 'jpeg', 'png'] as const;

export type Size = (typeof SIZES)[number];
export type Format = (typeof FORMATS)[number];

export const COLLECTIONS = {
	portraits: { count: 20, label: 'Portraits', blurb: 'Faces, expressions, character.' },
	food: { count: 20, label: 'Food', blurb: 'Plates, ingredients, kitchen craft.' },
	landscapes: { count: 20, label: 'Landscapes', blurb: 'Vistas, weather, terrain.' },
	architecture: { count: 20, label: 'Architecture', blurb: 'Buildings, lines, structure.' }
} as const;

export type Collection = keyof typeof COLLECTIONS;
export const COLLECTION_KEYS = Object.keys(COLLECTIONS) as Collection[];

export function oneUrl(c: Collection, n: number, w: Size, h: Size, fmt: Format) {
	return `${CDN_BASE}/one/${w}/${h}/${fmt}/${c}/${n}`;
}

export function randomUrl(c: Collection, w: Size, h: Size, fmt: Format) {
	return `${CDN_BASE}/random/${w}/${h}/${fmt}/${c}`;
}
