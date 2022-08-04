#
# CATEGORY: SlaveDriver Engine
#
# FORMAT: SlaveDriver Level
#
# EXTENSION: lev
#

#
# defs
#

lev_quake_level_titles = {
	"credits.lev": "Qweef",
	"test.lev": "Test Level",
	"end.lev": "Shub-Niggurath's Pit",
	"e4l11.lev": "Watery Grave",
	"e4l10.lev": "The Coliseum",
	"e4l9.lev": "Hell's Aerie",
	"e4l8.lev": "Purgatorium",
	"e4l7.lev": "Azure Agony",
	"e4l6.lev": "The Pain Maze",
	"e4l5.lev": "Hell's Atrium",
	"e4l4.lev": "The Palace of Hate",
	"e4l3.lev": "The Elder God Shrine",
	"e4l2.lev": "The Tower of Despair",
	"e4l1.lev": "The Sewage System",
	"e3l6.lev": "Chambers of Torment",
	"e3l5.lev": "Wind Tunnels",
	"e3l4.lev": "Satan's Dark Delight",
	"e3l3.lev": "The Tomb of Terror",
	"e3l2.lev": "The Vaults of Zin",
	"e3l1.lev": "Termination Central",
	"e2l6.lev": "The Dismal Oubliette",
	"e2l5.lev": "The Wizard's Manse",
	"e2l4.lev": "The Ebon Fortress",
	"e2l3.lev": "Crypt of Decay",
	"e2l2.lev": "Ogre Citadel",
	"e2l1.lev": "The Installation",
	"e1l7.lev": "The House of Chthon",
	"e1l6.lev": "The Door To Chthon",
	"e1l5.lev": "Gloom Keep",
	"e1l4.lev": "The Grisly Grotto",
	"e1l3.lev": "The Necropolis",
	"e1l2.lev": "Castle of the Damned",
	"e1l1.lev": "Slipgate Complex",
	"start.lev": "Entrance",
	"title.lev": "Title"
}

lev_quake_entities = {
	# lights and light subtypes
	38: "light", # static white
	92: "light", # (style?)
	110: "light", # heavy red pulse
	232: "light", # flicker
	235: "light", # (style?)
	253: "light", # (style?)
	# ammo and items
	29: "item_shells",
	88: "item_armor1",
	# player
	13: "info_player_start",
	# monsters
	243: "monster_army",
	244: "monster_dog",
	# miscellaneous
	113: "light_flame_large_yellow",
	# poly objects
	146: "misc_polymover"
}

lev_quake_palette = [
	[0, 0, 0, False], [2, 2, 2, True], [4, 4, 4, True], [6, 6, 6, True], [8, 8, 8, True], [9, 9, 9, True], [11, 11, 11, True], [13, 13, 13, True], [15, 15, 15, True], [17, 17, 17, True], [19, 19, 19, True], [21, 21, 21, True], [23, 23, 23, True], [25, 25, 25, True], [27, 27, 27, True], [29, 29, 29, True],
	[2, 1, 1, True], [3, 2, 1, True], [4, 3, 1, True], [5, 3, 2, True], [6, 4, 2, True], [7, 5, 3, True], [8, 6, 3, True], [9, 7, 3, True], [10, 7, 3, True], [11, 8, 4, True], [12, 9, 4, True], [13, 10, 4, True], [14, 11, 4, True], [15, 12, 4, True], [16, 13, 4, True], [17, 13, 4, True],
	[1, 1, 2, True], [2, 2, 3, True], [3, 3, 5, True], [5, 5, 6, True], [6, 6, 8, True], [7, 7, 9, True], [8, 8, 11, True], [9, 9, 13, True], [10, 10, 14, True], [11, 11, 15, True], [12, 12, 17, True], [13, 13, 18, True], [14, 14, 20, True], [15, 15, 21, True], [16, 16, 23, True], [17, 17, 25, True],
	[0, 0, 0, True], [1, 1, 0, True], [1, 1, 0, True], [2, 2, 0, True], [3, 3, 0, True], [4, 4, 0, True], [5, 5, 1, True], [6, 6, 1, True], [7, 7, 1, True], [8, 8, 1, True], [9, 9, 1, True], [9, 9, 1, True], [10, 10, 1, True], [11, 11, 1, True], [12, 12, 1, True], [13, 13, 2, True],
	[1, 0, 0, True], [2, 0, 0, True], [3, 0, 0, True], [4, 0, 0, True], [5, 0, 0, True], [6, 0, 0, True], [7, 0, 0, True], [8, 0, 0, True], [9, 0, 0, True], [10, 0, 0, True], [11, 0, 0, True], [12, 0, 0, True], [13, 0, 0, True], [13, 0, 0, True], [14, 0, 0, True], [15, 0, 0, True],
	[2, 2, 0, True], [3, 3, 0, True], [4, 4, 0, True], [6, 5, 0, True], [7, 6, 0, True], [8, 7, 0, True], [9, 7, 1, True], [11, 8, 1, True], [12, 9, 1, True], [13, 9, 1, True], [14, 10, 2, True], [16, 11, 2, True], [17, 11, 2, True], [18, 12, 3, True], [20, 12, 4, True], [21, 13, 4, True],
	[4, 2, 1, True], [6, 3, 1, True], [7, 4, 2, True], [9, 4, 2, True], [11, 5, 3, True], [12, 6, 4, True], [14, 7, 4, True], [15, 7, 5, True], [17, 8, 6, True], [19, 10, 6, True], [21, 12, 6, True], [23, 14, 6, True], [25, 17, 5, True], [27, 21, 5, True], [29, 25, 4, True], [31, 30, 3, True],
	[1, 1, 0, True], [3, 2, 0, True], [5, 4, 2, True], [7, 5, 2, True], [9, 6, 3, True], [10, 7, 4, True], [12, 8, 5, True], [13, 9, 6, True], [15, 10, 8, True], [17, 12, 9, True], [19, 13, 10, True], [20, 15, 12, True], [22, 16, 13, True], [24, 18, 15, True], [26, 20, 17, True], [28, 22, 18, True],
	[21, 17, 20, True], [19, 15, 18, True], [18, 14, 16, True], [17, 13, 15, True], [15, 11, 13, True], [14, 10, 12, True], [13, 9, 11, True], [12, 8, 9, True], [11, 7, 8, True], [9, 6, 7, True], [8, 5, 6, True], [7, 4, 4, True], [5, 3, 3, True], [4, 2, 2, True], [3, 1, 1, True], [2, 1, 1, True],
	[23, 14, 19, True], [21, 13, 17, True], [20, 12, 16, True], [18, 11, 14, True], [17, 10, 13, True], [15, 9, 12, True], [14, 8, 10, True], [13, 7, 9, True], [12, 6, 8, True], [10, 5, 7, True], [9, 4, 5, True], [7, 4, 4, True], [6, 3, 3, True], [4, 2, 2, True], [3, 1, 1, True], [2, 1, 1, True],
	[27, 24, 23, True], [25, 22, 20, True], [23, 20, 19, True], [21, 18, 17, True], [20, 16, 15, True], [18, 15, 13, True], [16, 13, 12, True], [15, 12, 10, True], [13, 11, 9, True], [12, 9, 7, True], [10, 8, 6, True], [8, 6, 5, True], [7, 5, 4, True], [5, 4, 3, True], [3, 2, 2, True], [2, 1, 1, True],
	[13, 16, 15, True], [13, 15, 13, True], [12, 14, 13, True], [11, 13, 12, True], [10, 12, 11, True], [9, 11, 10, True], [8, 10, 9, True], [7, 9, 8, True], [6, 8, 7, True], [5, 7, 6, True], [4, 6, 5, True], [4, 5, 4, True], [3, 4, 3, True], [2, 3, 2, True], [1, 2, 1, True], [1, 1, 1, True],
	[31, 30, 3, True], [29, 27, 3, True], [27, 25, 2, True], [25, 22, 2, True], [23, 20, 2, True], [21, 18, 1, True], [19, 16, 1, True], [17, 14, 1, True], [15, 12, 1, True], [13, 10, 0, True], [11, 9, 0, True], [9, 7, 0, True], [7, 5, 0, True], [5, 4, 0, True], [3, 2, 0, True], [1, 1, 0, True],
	[0, 0, 31, True], [1, 1, 29, True], [2, 2, 27, True], [3, 3, 25, True], [4, 4, 23, True], [5, 5, 21, True], [6, 6, 19, True], [6, 6, 17, True], [6, 6, 15, True], [6, 6, 13, True], [6, 6, 12, True], [5, 5, 10, True], [4, 4, 8, True], [3, 3, 6, True], [2, 2, 4, True], [1, 1, 2, True],
	[5, 0, 0, True], [7, 0, 0, True], [9, 1, 0, True], [12, 1, 0, True], [13, 2, 0, True], [15, 3, 1, True], [18, 4, 1, True], [20, 5, 1, True], [22, 6, 2, True], [24, 9, 3, True], [25, 12, 5, True], [27, 15, 7, True], [28, 18, 10, True], [28, 21, 12, True], [29, 23, 14, True], [30, 26, 17, True],
	[20, 15, 7, True], [22, 19, 7, True], [24, 24, 7, True], [28, 28, 11, True], [15, 23, 31, True], [21, 28, 31, True], [26, 31, 31, True], [13, 0, 0, True], [17, 0, 0, True], [22, 0, 0, True], [26, 0, 0, True], [31, 0, 0, True], [31, 30, 18, True], [31, 30, 24, True], [31, 31, 31, True], [0, 0, 0, True]
]

#
# functions
#

def compute_lev_quake_palette():
	palette_entries = []

	for i in range(len(lev_quake_palette)):
		palette_entries.append([(lev_quake_palette[i][0] / 31), (lev_quake_palette[i][1] / 31), (lev_quake_palette[i][2] / 31), lev_quake_palette[i][3]])

	return palette_entries

