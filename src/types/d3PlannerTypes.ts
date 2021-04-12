import { ClassName } from "./databasetypes"

export interface Kanai {
	weapon: string
	armor: string
	jewelry: string
}

export interface Paragon {
	level: number
	data: number[][]
}

export interface Stats {
	int: number[]
	sockets: number[]
	basearmor: number[]
	chc: number[]
	vit: number[]
	caldesanns_int: number[]
	hitfear: number[]
	ccr: number[]
	apoc: number[]
	maxap: number[]
	custom: number[]
}

export interface Head {
	id: string
	stats: Stats
	gems: any[][]
	empty: number
	ancient: boolean
}

export interface Stats2 {
	int: number[]
	sockets: number[]
	basearmor: number[]
	vit: number[]
	caldesanns_int: number[]
	life: number[]
}

export interface Torso {
	id: string
	stats: Stats2
	gems: any[][]
	ancient: boolean
	empty: number
}

export interface Stats3 {
	basearmor: number[]
	int: number[]
	vit: number[]
	cdr: number[]
	caldesanns_int: number[]
	life: number[]
	rcr: number[]
}

export interface Shoulders {
	id: string
	stats: Stats3
	ancient: boolean
	empty: number
}

export interface Stats4 {
	int: number[]
	chc: number[]
	basearmor: number[]
	chd: number[]
	cdr: number[]
	caldesanns_int: number[]
	ias: number[]
}

export interface Hands {
	id: string
	stats: Stats4
	empty: number
	ancient: boolean
}

export interface Stats5 {
	basearmor: number[]
	int: number[]
	chc: number[]
	vit: number[]
	dmgfir: number[]
	caldesanns_int: number[]
	custom: number[]
	pickup: number[]
	meleedef: number[]
}

export interface Wrists {
	id: string
	stats: Stats5
	ancient: boolean
	empty?: number
}

export interface Stats6 {
	caldesanns_int: number[]
	chd: number[]
	gf: number[]
	dmgfir: number[]
	chc: number[]
	sockets: number[]
	custom: any[]
}

export interface Neck {
	id: string
	stats: Stats6
	ancient: boolean
	empty: number
	gems: any[][]
}

export interface Stats7 {
	basearmor: number[]
	int: number[]
	sockets: number[]
	vit: number[]
	armor: number[]
	caldesanns_int: number[]
}

export interface Legs {
	id: string
	stats: Stats7
	ancient: boolean
	gems: any[][]
	empty?: number
}

export interface Stats8 {
	basearmor: number[]
	int: number[]
	vit: number[]
	life: number[]
	armor: number[]
	resphy: number[]
	caldesanns_int: number[]
	ias: number[]
	chd: number[]
}

export interface Waist {
	id: string
	stats: Stats8
	ancient: boolean
}

export interface Stats9 {
	int: number[]
	vit: number[]
	basearmor: number[]
	armor: number[]
	resall: number[]
	caldesanns_int: number[]
}

export interface Feet {
	id: string
	stats: Stats9
	ancient: boolean
}

export interface Stats10 {
	dmgfir: number[]
	wpnphy: number[]
	chc: number[]
	apoc: number[]
	cdr: number[]
	caldesanns_int: number[]
	int: number[]
	custom: number[]
	maxap: number[]
	rcr: number[]
	edmg: number[]
}

export interface Offhand {
	id: string
	stats: Stats10
	ancient: boolean
	empty: number
}

export interface Stats11 {
	sockets: number[]
	wpncol: number[]
	custom: number[]
	damage: number[]
	laek: number[]
	edmg: number[]
	cdr: number[]
	caldesanns_int: number[]
	wpnphy: number[]
	int: number[]
	hitfear: number[]
	weaponias: number[]
}

export interface Mainhand {
	id: string
	stats: Stats11
	ancient: boolean
	gems: any[][]
	empty: number
}

export interface Stats12 {
	caldesanns_int: number[]
	int: number[]
	cdr: number[]
	chc: number[]
	chd: number[]
	sockets: number[]
	gf: number[]
	custom: any[]
	rcr: number[]
	dura: any[]
	ias: number[]
}

export interface Rightfinger {
	id: string
	stats: Stats12
	ancient: boolean
	empty: number
	gems: any[][]
}

export interface Stats13 {
	chc: number[]
	sockets: number[]
	custom: number[]
	chd: number[]
	wpnphy: number[]
	caldesanns_int: number[]
	hitfear: number[]
	cdr: number[]
	ias: number[]
}

export interface Leftfinger {
	id: string
	stats: Stats13
	ancient: boolean
	gems: any[][]
	empty: number
}

export interface Items {
	head: Head
	torso: Torso
	shoulders: Shoulders
	hands: Hands
	wrists: Wrists
	neck: Neck
	legs: Legs
	waist: Waist
	feet: Feet
	offhand: Offhand
	mainhand: Mainhand
	rightfinger: Rightfinger
	leftfinger: Leftfinger
}

export interface Active {
	enchantress_focusedmind: number[]
	buff0: string
	buff1: string
	buff1_Unique_Bracer_007_x1: any[]
	buff1_toxin: number[]
	buff1_warcry: any[]
	buff1_threateningshout: any[]
	buff1_inspiringpresence: number[]
	buff1_ignorepain: any[]
	buff0_companion: any[]
	buff0_sentry: any[]
	buff0_multishot: any[]
	buff0_markedfordeath: any[]
	buff0_iceblink: number[]
	buff0_toxin: number[]
	buff0_P69_Unique_Bow_102: any[]
}

export interface StatPriority {
	stat: string
	options: any[]
	id: number
}

export interface Values {
	damage: number
	toughness: any
	recovery: number
	effdps: any
	effdph: any
	effedps: any
	effedph: any
}

export interface Buildinfo {
	text: string
}

export interface Profile {
	name: string
	skills: string[][]
	passives: string[]
	kanai: Kanai
	paragon: Paragon
	class: ClassName
	seasonal: number
	gender: string
	items: Items
	active: Active
	statPriority: StatPriority[]
	follower: string
	followerItems: any
	followerSkills: string[]
	values: Values
	mainset: string
	buildinfo: Buildinfo
	statPriorities?: Record<string, Array<string>> //own
}

export interface Active2 {
	leg_conventionofelements: number[]
	leg_squirtsnecklace: number[][]
	gogok: any[]
	teleport: number[]
	blackhole: any[]
	spectralblade: any[]
	archon: any[]
	elementalexposure: any[]
	stricken: any[]
	disintegrate: any[]
	pain: number[][]
	powerful: number[]
	leg_orbofinfinitedepth_p6: number[][]
	zei: any[]
	showElites: boolean
	targetBoss: boolean
	frostnova: number[]
	slowtime: number[]
}

export interface D3Build {
	profiles: Profile[]
	activeProfile: number
	active: Active2
	name: string
	class: string
	mainset: string
}
