export type Lyrics = {
	verse: string;
	verse_2: string;
	verse_3: string;
	pre_chorus: string;
	chorus: string;
	chorus_2: string;
	bridge: string;
	coda: string;
}

export type LineupModel = {
	id: number,
	label: string | undefined;
	artist: string | null;
	album: string | null;
	lyrics: Lyrics | null;
	chords: string | null;
	media: string | null;
	value: string | null;
	disabled: boolean;
	is_solemn: boolean;
	tags: string[];
}