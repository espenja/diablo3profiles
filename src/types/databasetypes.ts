export type Database = {
	minLevel: number
	maxLevel: number
	classes: Record<string, Class>
	cosmeticItems: Record<string, CosmeticItem>
	cosmeticDyes: Record<string, CosmeticDye>
	gemQualities: Array<
		| "Normal"
		| "Flawless"
		| "Square"
		| "Flawless Square"
		| "Star"
		| "Marquise"
		| "Imperial"
		| "Flawless Imperial"
		| "Royal"
		| "Flawless Royal"
	>
	oldGemQualities: Array<number>
	gemColors: Record<string, GemColor>
	legendaryGems: Record<LegendaryGemName, LegendaryGem>
	items: Array<Item>
	itemPowerClasses: Record<string, string>
	extraItems: Array<ExtraItem>
	classToIcon: Record<string, number>
	itemIcons: Record<string, Array<any>>
	potions: Array<Potion>
	itemSets: Record<string, ItemSet>
	shrineBuffs: Record<string, ShrineBuff>
	skillcat: Record<string, SkillCategory>
	skills: Record<ClassName, Record<string, Skill>>
	passives: Record<ClassName, Record<string, Passive>>
	followerSkills: Record<string, FollowerSkill>
	followerSkillList: Record<FollowerName, Array<string>>
	extraskills: Record<ClassName, Record<string, ExtraSkill>>
	skilltips: Record<ClassName, Record<string, SkillTip>>
	passiveTips: Record<ClassName, Record<string, string>>
	statLimits: Record<string, StatLimit>
	itemSlots: Record<string, ItemSlot>
	metaSlots: Record<string, MetaSlot>
	itemTypes: Record<string, ItemType>
	extraTypes: Record<string, string>
	qualities: Record<QualityName, Quality>
	elements: Elements
	stats: Record<string, any>
	resources: Resources
	statGroupNames: StatGroupNames
	statGroups: Record<string, any>
	statExclusiveGroups: Array<StatExclusiveGroup>
	statList: Record<string, any>
}

export type Resource = "ap" | "hatred" | "disc" | "fury" | "mana" | "spirit" | "wrath" | "essence"

export type ClassName = "wizard" | "demonhunter" | "barbarian" | "witchdoctor" | "monk" | "crusader" | "necromancer"

export type FollowerName = "templar" | "enchantress" | "scoundrel"

export type Class = {
	name:
		| "Wizard"
		| "Demon Hunter"
		| "Barbarian"
		| "Witch Doctor"
		| "Monk"
		| "Crusader"
		| "Necromancer"
		| "Templar"
		| "Enchantress"
		| "Scoundrel"

	primary: "int" | "dex" | "str"
	imageSuffix: string
	imageSuffixAlt?: string
	resources?: Array<Resource>
	dualwield?: boolean
	follower?: boolean
}

export type CosmeticItem = {
	name: string
	type: string
	promo?: boolean
}

export type CosmeticDye = {
	name: string
	type: number
	hex: string
}

export type GemQuality = string

export type GemColor = {
	id: string
	oldid: string
	name: string
	weapon: GemStat
	head: GemStat
	other: GemStat
}

export type GemStat = {
	stat: string
	amount: number[]
}

export type LegendaryGemName =
	| "powerful"
	| "trapped"
	| "hoarder"
	| "enforcer"
	| "esoteric"
	| "ease"
	| "toxin"
	| "gogok"
	| "invigorating"
	| "mirinae"
	| "gizzard"
	| "moratorium"
	| "pain"
	| "simplicity"
	| "taeguk"
	| "weath"
	| "zei"
	| "stricken"
	| "iceblink"
	| "mutilation"
	| "boyarsky"
	| "soulshard"
	| "legacyofdreams"

export type LegendaryGem = {
	id: string
	name: string
	types: "finger" | "neck" | "onehand" | "twohand" | "head"
	effects: Array<LegendaryGemEffect>
}

export type LegendaryGemEffect = {
	stat?: string
	format: string
	value?: Array<number>
	delta?: Array<number>
}

export type Item = {
	id: string
	name: string
	legacy?: boolean
	type: ItemTypeName
	quality: ItemQuality
	set: string
	required?: Record<string, any>
	preset: Array<
		| "allres"
		| "apoc"
		| "armor"
		| "bleed"
		| "block"
		| "ccr"
		| "cdr"
		| "chc"
		| "chd"
		| "damage"
		| "dex"
		| "dmgarc"
		| "dmgcol"
		| "dmgfir"
		| "dmghol"
		| "dmglit"
		| "dmgphy"
		| "dmgpsn"
		| "dura"
		| "edef"
		| "edmg"
		| "elemental"
		| "expadd"
		| "gf"
		| "gf"
		| "healbonus"
		| "hitblind"
		| "hitfear"
		| "hitimmobilize"
		| "hitslow"
		| "hitstun"
		| "ias"
		| "laek"
		| "life"
		| "lifefury"
		| "lifespirit"
		| "lph"
		| "mainstat"
		| "manaregen"
		| "maxap"
		| "maxdisc"
		| "maxfury"
		| "maxmana"
		| "meleedef"
		| "ms"
		| "onhit"
		| "pickup"
		| "rcr"
		| "regen"
		| "resall"
		| "resource"
		| "skill_barbarian_calloftheancients"
		| "skill_barbarian_earthquake"
		| "skill_barbarian_seismicslam"
		| "skill_crusader_blessedhammer"
		| "skill_crusader_phalanx"
		| "skill_demonhunter_rainofvengeance"
		| "skill_demonhunter_rapidfire"
		| "skill_demonhunter_sentry"
		| "skill_demonhunter_strafe"
		| "skill_head"
		| "skill_monk_deadlyreach"
		| "skill_monk_mystically"
		| "skill_monk_waveoflight"
		| "skill_witchdoctor_acidcloud"
		| "skill_witchdoctor_corpsespiders"
		| "skill_witchdoctor_fetisharmy"
		| "skill_witchdoctor_graspofthedead"
		| "skill_witchdoctor_spiritbarrage"
		| "skill_witchdoctor_zombiecharger"
		| "skill_wizard_meteor"
		| "sockets"
		| "spiritregen"
		| "thorns"
		| "vit"
		| "weaponias"
		| "wpnarc"
		| "wpncol"
		| "wpnfir"
		| "wpnfire"
		| "wpnhol"
		| "wpnholy"
		| "wpnlit"
		| "wpnphy"
		| "wpnpsn"
	>
}

export type ItemTypeName =
	| "amulet"
	| "axe"
	| "axe2h"
	| "belt"
	| "boots"
	| "bow"
	| "bracers"
	| "ceremonialknife"
	| "chestarmor"
	| "cloak"
	| "crossbow"
	| "crusadershield"
	| "dagger"
	| "daibo"
	| "enchantressfocus"
	| "fistweapon"
	| "flail"
	| "flail2h"
	| "gloves"
	| "handcrossbow"
	| "helm"
	| "mace"
	| "mace2h"
	| "mightybelt"
	| "mightyweapon"
	| "mightyweapon2h"
	| "mojo"
	| "pants"
	| "phylactery"
	| "polearm"
	| "quiver"
	| "ring"
	| "scoundreltoken"
	| "scythe"
	| "scythe2h"
	| "shield"
	| "shoulders"
	| "source"
	| "spear"
	| "spiritstone"
	| "staff"
	| "sword"
	| "sword2h"
	| "templarrelic"
	| "voodoomask"
	| "wand"
	| "wizardhat"

export type ItemQuality = "legendary" | "set" | "magic"

export type ExtraItem = {
	id: string
	name: string
	quality: ItemQuality
	description: string
	flavor?: string
	icon: number
	size?: string
	type?: "portal" | "crafting" | "plansmith" | "planjeweler" | "planmystic"
}

export type Potion = {
	id: string
	name: string
	type: "potion"
	quality: "legendary"
	required: Record<string, any>
}

export type ItemSet = {
	name: string
	bonuses: Record<string, ItemBonus>
	order?: Array<string>
	tclass: ClassName
	class: ClassName
	legacy: boolean
}

export type ItemBonus = {
	stat?: string
	value?: Array<number>
	format?: string
}

export type ShrineBuff = {
	name: string
	altname: string
	icon: number
	description: Array<string>
}

export type SkillCategory = {
	primary: string
	secondary: string
	defensive?: string
	might?: string
	tactics?: string
	rage?: string
	utility?: string
	laws?: string
	conviction?: string
	hunting?: string
	devices?: string
	archery?: string
	techniques?: string
	focus?: string
	mantras?: string
	corpses?: string
	reanimation?: string
	curses?: string
	bloodbone?: string
	terror?: string
	decay?: string
	voodoo?: string
	force?: string
	conjuration?: string
	mastery?: string
}

export type Skill = {
	id: string
	name: string
	category: string
	row: number
	col: number
	runes: Record<"a" | "b" | "c" | "d" | "e", string>
	range: number
}

export type Passive = {
	id: string
	name: string
	index: number
}

export type FollowerSkill = {
	class: string
	description: string
	icon: number
	icon_inactive: number
	level: number
	name: string
}

export type ExtraSkill = {
	skill: string
	name: string
	row: number
	col: number
	tip: string
	range: number
}

export type SkillTip = {
	[key: string]: string
} & {
	icon: number
	elements: Record<string, string>
}

export type StatLimit = Record<string, string | number>

export type ItemSlot = {
	name: string
	classes: Array<FollowerName>
	affixes: Record<string, string>
	required?: Record<string, string>
	sockets?: number
	socketType?: string
}

export type MetaSlot = {
	name: string
	slots: Array<string>
	affixes?: Record<string, string>
	socketType?: Record<string, string>
	preset?: Array<string>
}

export type ItemType = {
	slot: string
	name: string
	generic: string
	class?: ClassName | FollowerName
	classes?: Array<ClassName>
	affixes?: Record<string, string>
	required?: Record<string, string>
	attack?: string
	weapon?: Record<string, string | number>
}

export type QualityName = "normal" | "magic" | "rare" | "legendary" | "set" | "epic" | "unique"

export type Quality = {
	prefix: string
	color: string
	ancient?: string
	primal?: string
}

export type Elements = {
	arc: string
	col: string
	fir: string
	hol: string
	lit: string
	phy: string
	psn: string
}

export type Resources = {
	ap: string
	hatred: string
	disc: string
	mana: string
	fury: string
	spirit: string
	wrath: string
	essence: string
}

export type StatGroupNames = {
	weapon: string
	elemental: string
	resist: string
	resistany: string
	mainstat: string
	onhit: string
	resource: string
}

export type StatExclusiveGroup =
	| "weapon"
	| "elemental"
	| "resistany"
	| "mainstat"
	| "skill"
	| "onhit"
	| "lifeper"
	| "caldesanns"
