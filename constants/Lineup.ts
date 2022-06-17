import { LineupModel } from "../Types/Lineup";
import { VIAModel } from "../Types/VIA";
const YOUTUBE_LOGO = require('../assets/images/youtube.webp');

const VIA: VIAModel[] = [
	{
		id: 'wan-via-1',
		name: 'Nikki Cueno',
		is_available: true,
		is_wl: false,
	},
	{
		id: 'wan-via-2',
		name: 'Justine Judilla',
		is_available: true,
		is_wl: false,
	},
	{
		id: 'wan-via-3',
		name: 'Eunice Nikki Floralde',
		is_available: true,
		is_wl: false,
	},
	{
		id: 'wan-via-4',
		name: 'John Pallan',
		is_available: true,
		is_wl: false,
	},
	{
		id: 'wan-via-5',
		name: 'Diane Agreda',
		is_available: true,
		is_wl: false,
	},
	{
		id: 'wan-via-6',
		name: 'Reisel Ann Cayao',
		is_available: true,
		is_wl: false,
	},
];

const LINEUP: LineupModel[] = [
	{
		id: 1,
		label: 'Opening Song',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: true,
		tags: ['Solemn']
	},
	{
		id: 2,
		label: 'Welcome Song',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: false,
		tags: ['Joyful']
	},
	{
		id: 3,
		label: 'Joyful Song #1',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: false,
		tags: ['Joyful']
	},
	{
		id: 4,
		label: 'Joyful Song #2',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: false,
		tags: ['Joyful']
	},
	{
		id: 5,
		label: 'Joyful Song #3',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: false,
		tags: ['Joyful']
	},
	{
		id: 6,
		label: 'Solemn Song #1',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: true,
		tags: ['Solemn']
	},
	{
		id: 7,
		label: 'Solemn Song #2',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: true,
		tags: ['Solemn']
	},
	{
		id: 8,
		label: 'Solemn Song #3',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: true,
		tags: ['Solemn']
	},
	{
		id: 9,
		label: 'Pastoral Song',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: true,
		tags: ['Solemn']
	},
	{
		id: 10,
		label: 'Victory Song',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: false,
		tags: ['Solemn']
	},
	{
		id: 11,
		label: 'Closing Song',
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		value: null,
		disabled: false,
		media: null,
		is_solemn: true,
		tags: ['Solemn']
	},
	
];

export default {VIA, LINEUP, YOUTUBE_LOGO}