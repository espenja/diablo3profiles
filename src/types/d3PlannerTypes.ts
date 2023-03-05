export interface D3Planner {
	accessed: number
	average_rating: number
	category: string
	class: string
	data: D3PlannerProfiles
	date: Date
	folder: number
	game: string
	id: string
	mainset: string
	name: string
	public: number
	total_ratings: number
	user: User
}

export interface User {
	id: number
	username: string
}

export interface D3PlannerProfiles {
	profiles: Profile[]
	curstat: string
	class: string
	mainset: string
	active: D3PlannerProfilesActive
	name: string
	activeProfile: number
}

export interface D3PlannerProfilesActive {
	hoarder: number[]
	zei: Array<number[] | number>
	stricken: Array<number[] | number>
	leg_conventionofelements: number[]
	leg_avariceband: Array<number[]>
	leg_haloofkarini_p6: number[]
	leg_squirtsnecklace: Array<number[]>
	slowtime: number[]
	hydra: Array<Array<number | string>>
	blackhole: Array<number[] | number>
	arcanedynamo: number[]
	moreWarnings: boolean
	limitStats: boolean
	hideCrossClass: boolean
	hideLegacy: boolean
	showElites: boolean
	targetBoss: boolean
	targetType: string
	teleport: number[]
	leg_sliverofterror: Array<number[]>
}

export interface Profile {
	name: string
	skills: Array<string[]>
	passives: string[]
	kanai: Kanai
	paragon: Paragon
	class: string
	seasonal: number
	gender: string
	items: Items
	active: any[] | ActiveActive
	statPriority: StatPriority[]
	follower: null | string
	followerItems: FollowerItems
	followerSkills: Array<null | string>
	mainset: string
	buildinfo: Buildinfo
	values: Values
	statPriorities?: Record<string, Array<string>> // Custom
}

export interface ActiveActive {
	buff1_bigbadvoodoo: Array<number | string>
}

export interface Buildinfo {
	ratings: Ratings
	text: string
}

export interface Ratings {
	show: boolean
}

export interface FollowerItems {
	feet?: ShouldersClass
	legs?: Legs
	waist?: ShouldersClass
	torso?: Torso
	head?: Head
	shoulders?: ShouldersClass
	hands?: WristsClass
	neck?: Neck
	wrists?: WristsClass
	rightfinger?: Tfinger
	leftfinger?: Tfinger
	follower?: Follower
	mainhand?: FollowerItemsMainhand
}

export interface ShouldersClass {
	id: string
	stats: { [key: string]: number[] }
	ancient: boolean
	empty?: number
}

export interface Follower {
	id: string
	stats: FollowerStats
	empty?: number
	ancient: boolean
}

export interface FollowerStats {
	custom: any[]
	dex?: number[]
	int?: number[]
	resall?: number[]
	lph?: number[]
	vit?: number[]
}

export interface WristsClass {
	id: HandsID
	stats: WristsStats
	ancient: boolean
	empty?: number
}

export enum HandsID {
	UniqueBracer106_X1 = "Unique_Bracer_106_x1",
	UniqueGloves103_X1 = "Unique_Gloves_103_x1"
}

export interface WristsStats {
	dex?: number[]
	lph?: number[]
	chd?: number[]
	basearmor: number[]
	custom: any[]
	int?: number[]
	ias?: number[]
	vit?: number[]
	armor?: number[]
}

export interface Head {
	id: string
	stats: HeadStats
	ancient: boolean
	gems: Array<Array<number | string>>
	empty?: number
}

export interface HeadStats {
	expadd?: number[]
	basearmor: number[]
	dex?: number[]
	sockets: number[]
	int?: number[]
	vit?: number[]
	lph?: number[]
}

export interface Tfinger {
	id: string
	stats: { [key: string]: number[] }
	ancient: boolean
	empty?: number
	gems: Array<Array<PurpleGem | number>>
}

export enum PurpleGem {
	Emerald = "emerald",
	Esoteric = "esoteric",
	Mutilation = "mutilation"
}

export interface Legs {
	id: LegsID
	stats: LegsStats
	ancient: boolean
	empty: number
	gems: Array<Array<FluffyGem | number>>
}

export enum FluffyGem {
	Amethyst = "amethyst",
	Diamond = "diamond",
	Emerald = "emerald",
	Topaz = "topaz"
}

export enum LegsID {
	P66UniquePants010 = "P66_Unique_Pants_010",
	P68UniqueChestSet03 = "P68_Unique_Chest_Set_03",
	P68UniquePantsSet03 = "P68_Unique_Pants_Set_03"
}

export interface LegsStats {
	basearmor: number[]
	sockets: number[]
	dex?: number[]
	int?: number[]
	vit?: number[]
	armor?: number[]
	caldesanns_int?: number[]
	skill_wizard_hydra?: number[]
}

export interface FollowerItemsMainhand {
	id: string
	stats: { [key: string]: number[] }
	ancient: boolean
	empty: number
	gems?: Array<Array<FluffyGem | number>>
}

export interface Neck {
	id: string
	stats: NeckStats
	ancient: boolean
	empty: number
	gems: Array<Array<FluffyGem | number>>
}

export interface NeckStats {
	cdr: number[]
	custom: any[]
	sockets: number[]
	dex?: number[]
	ias?: number[]
	int?: number[]
	life?: number[]
}

export interface Torso {
	id: string
	stats: { [key: string]: number[] }
	ancient: boolean
	gems: Array<Array<FluffyGem | number>>
	empty: number
}

export interface Items {
	head: Torso
	shoulders: Offhand
	neck: Leftfinger
	torso: Legs
	waist: ShouldersClass
	hands: ItemsHands
	wrists: ShouldersClass
	legs: Legs
	feet: PurpleFeet
	leftfinger: Leftfinger
	rightfinger: Rightfinger
	mainhand: ItemsMainhand
	offhand: Offhand
}

export interface PurpleFeet {
	id: string
	stats: FeetStats
	ancient: boolean
	empty: number
}

export interface FeetStats {
	basearmor: number[]
	int: number[]
	vit: number[]
	resall: number[]
	armor: number[]
	caldesanns_int: number[]
}

export interface ItemsHands {
	id: string
	stats: PurpleStats
	ancient: boolean
	empty: number
}

export interface PurpleStats {
	basearmor: number[]
	int: number[]
	ias?: number[]
	chd: number[]
	chc: number[]
	caldesanns_int: number[]
	area?: number[]
}

export interface Leftfinger {
	id: LeftfingerID
	stats: { [key: string]: number[] }
	ancient: boolean
	gems: Array<Array<number | string>>
	empty?: number
}

export enum LeftfingerID {
	P61UniqueRing03 = "P61_Unique_Ring_03",
	P66UniqueAmulet010 = "P66_Unique_Amulet_010",
	UniqueRing108_X1 = "Unique_Ring_108_x1"
}

export interface ItemsMainhand {
	id: string
	stats: { [key: string]: number[] }
	ancient: boolean
	gems: Array<Array<PurpleGem | number>>
	empty: number
}

export interface Offhand {
	id: string
	stats: { [key: string]: number[] }
	ancient: boolean
	empty: number
}

export interface Rightfinger {
	id: string
	stats: { [key: string]: number[] }
	ancient: boolean
	gems: Array<Array<number | string>>
	empty: number
}

export interface Kanai {
	weapon: string
	armor: string
	jewelry: string
	extra?: string
}

export interface Paragon {
	level: number
	data: Array<number[]>
}

export interface StatPriority {
	stat: Stat
	options: any[]
	id: number
}

export enum Stat {
	Dps = "dps",
	Sockets = "sockets",
	Toughness = "toughness"
}

export interface Values {
	damage: number
	toughness: number
	recovery: number
	effdps: number
	effdph: number
	effedps: number
	effedph: number
}
