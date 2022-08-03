# python modules
import tkinter
from tkinter import *
from tkinter import filedialog
from tkinter.ttk import Combobox
import os, os.path
from os import listdir
from os.path import isfile, join, splitext, exists, split, isdir
import sys, getopt

# libraries
from libio.image import *
from libio.sound import *

# format definition libraries
from libformats.slavedriver_lev_quake import SlavedriverLevQuake
from libformats.slavedriver_pic_quake import SlavedriverPicQuake
from libformats.slavedriver_pcs_powerslave import SlavedriverPcsPowerslave
from libformats.brender_pix import BrenderPix

# format parsing libraries
from libparsers.lev import *
from libparsers.pic import *
from libparsers.pcs import *
from libparsers.pix import *

#
# defs
#

# window colors
color_bg = "#171717"
color_bg_dark = "black"
color_text = "white"
color_black = "black"
color_white = "white"

# action area text
text_action_none = "No actions for this format."
text_action_nofile = "No file selected."

# error text
text_error_filenotfound = "Error: Could not find the file."
text_error_nodir = "Error: User did not select directory, exiting."
text_error_invaliddir = "Error: Invalid directory."
text_error_unknownext = "Error: Unknown file extension or type."

# text styling
font_header = "Arial 20 bold"
font_subheader = "Arial 16 bold"
font_body = "Arial 12"
font_body_bold = "Arial 12 bold"
font_small = "Arial 9"
font_small_bold = "Arial 9 bold"

# directories
var_gamedir = ""

#
# window functions
#

def add_console_message(message):
	message += "\n"
	console.insert(INSERT, message)
	console.see("end")
	print(message)

def add_action_message(text):
	message = tkinter.Label(actions_frame, text=text, font=font_body, justify=LEFT, fg=color_text, bg=color_bg)
	message.pack(side=TOP, anchor="nw")

def clear_frame(frame):
	for widget in frame.winfo_children():
		widget.destroy()

def clear_slate(sConsoleMessage, sActionMessage, bClearFiles):
	file_info.delete('1.0', END)
	clear_frame(actions_frame)
	if bClearFiles:
		file_listbox.delete(0, END)
	if sActionMessage != "":
		add_action_message(text=sActionMessage)
	if sConsoleMessage != "":
		add_console_message(message=sConsoleMessage)

def populate_listbox_with_files(list, dir):
	for f in listdir(dir):
		if isfile(join(dir, f)):
			list.insert(tkinter.END, f)

def game_changed(event):
	add_console_message(message=f"Game changed to {var_game.get()}")

def choose_gamedir():
	var_gamedir = filedialog.askdirectory(title="Select Game Directory")

	if not var_gamedir or var_gamedir == "":
		clear_slate(sConsoleMessage=text_error_nodir, sActionMessage=text_action_nofile, bClearFiles=True)
		return

	populate_listbox_with_files(file_listbox, var_gamedir)
	file_directory.insert(0, var_gamedir)
	add_console_message(message=f"Game directory: {var_gamedir}")

def parse_gamedir(event):
	var_gamedir = file_directory.get()

	if not var_gamedir or var_gamedir == "":
		clear_slate(sConsoleMessage=text_error_invaliddir, sActionMessage=text_action_nofile, bClearFiles=True)
		return

	populate_listbox_with_files(file_listbox, var_gamedir)
	add_console_message(message=f"Game directory: {var_gamedir}")
	return "break"

def parse_file(event):
	filename = file_listbox.get(file_listbox.curselection())
	clear_slate(sConsoleMessage=f"Parsing file: {filename}", sActionMessage="", bClearFiles=False)
	filepath = join(var_gamedir, filename)
	current_file_tuple = splitext(filename)
	name = current_file_tuple[0].lower()
	ext = current_file_tuple[1].lower()

	if not exists(filepath):
		clear_slate(sConsoleMessage=text_error_filenotfound, sActionMessage=text_action_nofile, bClearFiles=False)
		return

	if ext == ".lev": parse_lev(filepath)
	elif ext == ".pic": parse_pic(filepath)
	elif ext == ".pcs": parse_pcs(filepath)
	elif ext == ".pix": parse_pix(filepath)

#
# window setup
#

window = tkinter.Tk()
window.title("Liberator")
window.geometry("800x600")
window.resizable(False, False)
window["background"] = color_bg

#
# file listbox
#

file_listbox_header = tkinter.Label(window, text="Files", font=font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
file_listbox_header.place(x=16, y=16)

file_listbox = tkinter.Listbox(window, selectmode="single", fg=color_text, bg=color_bg_dark)
file_listbox.bind('<Double-Button-1>', parse_file)
file_listbox.place(x=16, y=48, width=192, height=320)

file_directory = tkinter.Entry(window, fg=color_black, bg=color_white)
file_directory.place(x=104, y=384, width=440, height=24)
file_directory.configure(wrap=None)
file_directory.bind('<Return>', parse_gamedir)

file_listbox_loadbutton = tkinter.Button(window, text="Browse...", command=choose_gamedir)
file_listbox_loadbutton.place(x=16, y=384, width=80, height=24)

#
# file info box
#

file_info_header = tkinter.Label(window, text="File Info", font=font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
file_info_header.place(x=224, y=16)

file_info = tkinter.Text(window, fg=color_text, bg=color_bg_dark)
file_info.place(x=224, y=48, width=320, height=320)
file_info.bind("<Key>", lambda e: "break")

#
# actions
#

actions_header = tkinter.Label(window, text="Actions", font=font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
actions_header.place(x=560, y=16)

actions_frame = tkinter.Frame(window, bg=color_bg)
actions_frame.place(x=560, y=48, width=224, height=320)

#
# game selection combobox
#

#self.game_select_header = tkinter.Label(self.window, text="Game", font=self.font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
#self.game_select_header.place(x=560, y=384)

var_game = tkinter.StringVar()
game_select_combobox = Combobox(window, textvariable=var_game)
game_select_combobox["values"] = ("Quake", "PowerSlave (Experimental)", "Duke Nukem 3D (Experimental)", "PowerSlave PSX (Experimental)")
game_select_combobox.place(x=560, y=384, width=224, height=24)
game_select_combobox.set("Quake")
game_select_combobox['state'] = "readonly"
game_select_combobox.bind('<<ComboboxSelected>>', game_changed)

#
# console
#

console_header = tkinter.Label(window, text="Console", font=font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
console_header.place(x=16, y=424)

console = tkinter.Text(window, fg=color_text, bg=color_bg_dark)
console.place(x=16, y=456, width=768, height=128)
console.bind("<Key>", lambda e: "break")

#
# main loop
#

window.mainloop()

exit()

class main_display:

	#
	# tkinter-related funcs
	#

	def clear_slate(self, console_message, action_message, bClearFiles):
		self.file_info.delete('1.0', END)
		self.clear_frame(self.actions_frame)
		if bClearFiles:
			self.file_listbox.delete(0, END)
		if action_message != "":
			self.add_action_message(text=action_message)
		if console_message != "":
			self.send_message(message=console_message)

	def send_message(self, message):
		message += "\n"
		self.console.insert(INSERT, message)
		self.console.see("end")
		print(message)

	def add_file_info(self, message):
		message += "\n"
		self.file_info.insert(INSERT, message)
		self.file_info.see("end")

	def choose_gamedir(self, window_resolution):
		if not self.gamedir or self.gamedir == "":
			self.clear_slate(console_message=text_error_nodir, action_message=text_action_nofile, bClearFiles=True)
			return

		self.populate_listbox_with_files(self.file_listbox, self.gamedir)
		self.file_directory.insert(0, self.gamedir)
		self.send_message(message=f"Game directory: {self.gamedir}")

	def parse_gamedir(self, event):
		self.gamedir = self.file_directory.get()

		if not self.gamedir or self.gamedir == "":
			self.clear_slate(console_message=text_error_invaliddir, action_message=text_action_nofile, bClearFiles=True)
			return

		self.populate_listbox_with_files(self.file_listbox, self.gamedir)
		self.send_message(message=f"Game directory: {self.gamedir}")
		return "break"

	def populate_listbox_with_files(self, list, dir):
		for f in listdir(dir):
			if isfile(join(dir, f)):
				list.insert(tkinter.END, f)

	#
	# POWERSLAVE PCS
	#

	def pcs_convert_png(self):
		output_dir = filedialog.askdirectory(title="Select Output Directory")

		if not output_dir or output_dir == "":
			self.send_message(message=text_error_nodir)
			return

		for i, bitmap in enumerate(self.pcs.bitmaps):
			output = f"{output_dir}/{self.current_file_tuple[0]}_bitmap{i:04d}.png"
			palette = self.compute_palette(self.pcs.PaletteEntryT, bitmap.palette)
			pixels = self.compute_texture_paletted(bitmap.bitmap, (bitmap.width, bitmap.height), palette)
			self.write_png(output, pixels)

			if exists(output):
				self.send_message(message=f"File saved: {output}")
			else:
				self.send_message(message=f"Error: Failed to save image {os.path.basename(output)}")

	def parse_pcs(self, filepath):
		self.pcs = SlavedriverPcsPowerslave.from_file(filepath)
		if self.pcs:
			name = f"{self.current_file_tuple[0]}{self.current_file_tuple[1]}"
			# tell user it's loaded
			self.send_message(message="Found: SlaveDriver Bitmap")
			# fill out information
			self.add_file_info(message=f"File Name: {name}")
			self.add_file_info(message="File Type: SlaveDriver Bitmap")
			# add action buttons
			self.add_action_button(text="Convert to PNG", command=self.pcs_convert_png)
		else:
			self.clear_slate(console_message=text_error_unknownext, action_message=text_action_none, bClearFiles=False)

	#
	# QUAKE PIC
	#

	def pic_convert_png(self):
		output = filedialog.asksaveasfilename(title="Select Output Filename", filetypes=(("Portable Network Graphic (PNG)", "*.png"),("All Files", "*.*")), initialfile=self.current_file_tuple[0], defaultextension=".png")

		if not output or output == "":
			self.send_message(message=text_error_nodir)
			return

		palette = self.compute_palette(self.pic.PaletteEntryT, self.pic.palette)
		pixels = self.compute_texture_paletted(self.pic.bitmap, (self.pic.width, self.pic.height), palette)
		self.write_png(output, pixels)
		if exists(output):
			self.send_message(message=f"File saved: {output}")
		else:
			self.send_message(message=f"Error: Failed to save image {os.path.basename(output)}")

	def parse_pic(self, filepath):
		self.pic = SlavedriverPicQuake.from_file(filepath)
		if self.pic:
			name = f"{self.current_file_tuple[0]}{self.current_file_tuple[1]}"
			# tell user it's loaded
			self.send_message(message="Found: SlaveDriver Bitmap")
			# fill out information
			self.add_file_info(message=f"File Name: {name}")
			self.add_file_info(message="File Type: SlaveDriver Bitmap")
			self.add_file_info(message="")
			self.add_file_info(message=f"Resolution: {self.pic.width}x{self.pic.height}")
			# add action buttons
			self.add_action_button(text="Convert to PNG", command=self.pic_convert_png)
		else:
			self.clear_slate(console_message=text_error_unknownext, action_message=text_action_none, bClearFiles=False)

	#
	# QUAKE LEV
	#

	def parse_lev(self, filepath):
		self.lev = SlavedriverLevQuake.from_file(filepath)
		if self.lev:
			name = f"{self.current_file_tuple[0]}{self.current_file_tuple[1]}"
			title = self.lev_match_name(f"{self.current_file_tuple[0]}{self.current_file_tuple[1]}")
			numTextures = 0
			# tell user it's loaded
			self.send_message(message="Found: SlaveDriver Level (Quake)")
			# fill out information
			self.add_file_info(message=f"File Name: {name}")
			self.add_file_info(message="File Type: SlaveDriver Level (Quake)")
			self.add_file_info(message="")
			self.add_file_info(message=f"Level Title: {title}")
			self.add_file_info(message="")
			self.add_file_info(message=f"Vertices: {self.lev.header.num_vertices}")
			self.add_file_info(message=f"Nodes: {self.lev.header.num_nodes}")
			self.add_file_info(message=f"Planes: {self.lev.header.num_planes}")
			self.add_file_info(message=f"Quads: {self.lev.header.num_quads}")
			self.add_file_info(message=f"Tiles: {self.lev.header.num_tile_entries}")
			self.add_file_info(message="")
			self.add_file_info(message=f"Entities: {self.lev.header.num_entities}")
			self.add_file_info(message=f"Entity Polylinks: {self.lev.header.num_entity_polylinks}")
			self.add_file_info(message="")
			self.add_file_info(message=f"Sounds: {self.lev.resources.num_sounds}")

			for resource in self.lev.resources.resources:
				if resource.resource_type == 130:
					numTextures += 1

			self.add_file_info(message=f"Textures: {numTextures}")
			self.add_file_info(message=f"Other Resources: {self.lev.resources.num_resources - numTextures}")
			# add action buttons
			self.add_action_button(text="Extract Sounds", command=self.lev_extract_sounds)
			self.add_action_button(text="Extract Textures", command=self.lev_extract_textures)
			self.add_action_button(text="Extract Entities", command=self.lev_extract_entities)
			self.add_action_button(text="Extract Node Volumes", command=self.lev_extract_nodes)
			#self.add_action_button(text="Extract Bitmaps", command=self.lev_extract_bitmaps)
		else:
			self.clear_slate(console_message=text_error_unknownext, action_message=text_action_none, bClearFiles=False)

	def lev_extract_nodes(self):
		output = filedialog.asksaveasfilename(title="Select Output Filename", filetypes=(("Quake Map Source File (MAP)", "*.map"),("All Files", "*.*")), initialfile=self.current_file_tuple[0], defaultextension=".map")

		if not output or output == "":
			self.send_message(message=text_error_nodir)
			return

		nodes_file = open(output, "w")

		nodes_file.write("{\n")
		nodes_file.write("\"classname\" \"worldspawn\"\n")

		for brushNum, node in enumerate(self.lev.nodes):
			nodes_file.write(f"// brush {brushNum}\n")
			nodes_file.write("{\n")
			for i in range(node.last_plane - node.first_plane + 1):
				plane = self.lev.planes[node.first_plane + i]
				v0 = self.lev.verts[plane.vertex_indices[0]].coords
				v1 = self.lev.verts[plane.vertex_indices[1]].coords
				v2 = self.lev.verts[plane.vertex_indices[2]].coords
				v3 = self.lev.verts[plane.vertex_indices[3]].coords

				nodes_file.write(f"( {v0[0]} {v0[1]} {v0[2]} ) ( {v1[0]} {v1[1]} {v1[2]} ) ( {v3[0]} {v3[1]} {v3[2]} ) *waterskip 0 0 0 1 1\n")
	
			nodes_file.write("}\n")

		nodes_file.write("}\n")

		nodes_file.close()

		if exists(output):
			self.send_message(message=f"File saved: {output}")
		else:
			self.send_message(message=f"Error: Failed to save image {os.path.basename(output)}")

	def lev_extract_entities(self):
		output = filedialog.asksaveasfilename(title="Select Output Filename", filetypes=(("Quake Entity File (ENT)", "*.ent"),("All Files", "*.*")), initialfile=self.current_file_tuple[0], defaultextension=".ent")

		if not output or output == "":
			self.send_message(message=text_error_nodir)
			return

		lev_title = self.lev_match_name(f"{self.current_file_tuple[0]}{self.current_file_tuple[1]}")

		ent_file = open(output, "w")

		ent_file.write("{\n")
		ent_file.write("\"classname\" \"worldspawn\"\n")
		ent_file.write(f"\"message\" \"{lev_title}\"\n")
		ent_file.write("\"skin\" \"-2\"\n")
		ent_file.write("}\n")

		for entity in self.lev.entities:
			if self.match_entity(entity.ent_type) != "misc_polymover" and entity.get_entity_data != None:
				entloc = [
					-entity.get_entity_data.coords[0],
					-entity.get_entity_data.coords[2],
					entity.get_entity_data.coords[1]
				]
			else:
				entloc = [0, 0, 0]

			if self.match_entity(entity.ent_type)[0:8] == "monster_":
				entloc[2] += 64

			ent_file.write("{\n")
			ent_file.write(f"\"classname\" \"{self.match_entity(entity.ent_type)}\"\n")
			ent_file.write(f"\"origin\" \"{entloc[0]} {entloc[1]} {entloc[2]}\"\n")
			ent_file.write("}\n")

		ent_file.close()

		if exists(output):
			self.send_message(message=f"File saved: {output}")
		else:
			self.send_message(message=f"Error: Failed to save image {os.path.basename(output)}")

	def lev_extract_textures(self):
		self.send_message(message=f"Extracting textures from {self.current_file_tuple[0]}{self.current_file_tuple[1]}...")
		output_dir = filedialog.askdirectory(title="Select Output Directory")

		if not output_dir or output_dir == "":
			self.send_message(message=text_error_nodir)
			return

		numTextures = 0

		for resource in self.lev.resources.resources:
			if resource.resource_type == 130:
				output = f"{output_dir}/{self.current_file_tuple[0]}_texture{numTextures:04d}.png"
				texture = resource.data

				palette = self.compute_palette(self.lev.PaletteEntryT, texture.palette)
				pixels = self.compute_texture_paletted(texture.bitmap, (64, 64), palette)
				self.write_png(output, pixels)

				if exists(output):
					self.send_message(message=f"File saved: {output}")
				else:
					self.send_message(message=f"Error: Failed to save image {os.path.basename(output)}")

				numTextures += 1

		self.send_message(message=f"Finished extracting textures from {self.current_file_tuple[0]}{self.current_file_tuple[1]}")

	def lev_extract_sounds(self):
		self.send_message(message=f"Extracting sounds from {self.current_file_tuple[0]}{self.current_file_tuple[1]}...")
		output_dir = filedialog.askdirectory(title="Select Output Directory")

		if not output_dir or output_dir == "":
			self.send_message(message=text_error_nodir)
			return

		for i, sound in enumerate(self.lev.resources.sounds):
			num_channels = 1
			samples_per_second = 11025
			bytes_per_sample = sound.bits // 8
			bytes_per_frame = num_channels * bytes_per_sample
			num_frames = sound.len_samples // bytes_per_frame

			output = f"{output_dir}/{self.current_file_tuple[0]}_sound{i:04d}.wav"

			write_wav(output, num_channels, samples_per_second, bytes_per_sample, bytes_per_frame, num_frames, sound.bits, sound.samples)

			if exists(output):
				self.send_message(message=f"File saved: {output}")
			else:
				self.send_message(message=f"Error: Failed to save sound {os.path.basename(output)}")

		self.send_message(message=f"Finished extracting sounds from {self.current_file_tuple[0]}{self.current_file_tuple[1]}")

	#
	# PARSE FILE
	#

	def parse_file(self, event):
		filename = self.file_listbox.get(self.file_listbox.curselection())
		self.clear_slate(console_message=f"Parsing file: {filename}", action_message="", bClearFiles=False)
		filepath = join(self.gamedir, filename)
		self.current_file_tuple = splitext(filename)
		name = self.current_file_tuple[0].lower()
		ext = self.current_file_tuple[1].lower()

		if not exists(filepath):
			self.clear_slate(console_message=text_error_filenotfound, action_message=text_action_nofile, bClearFiles=False)
			return

		#match ext:
		#	case ".lev": self.parse_lev(filepath)
		#	case ".pic": self.parse_pic(filepath)
		#	case ".pcs": self.parse_pcs(filepath)
		#	case _: self.clear_slate(console_message=text_error_unknownext, action_message=text_action_none, bClearFiles=False)

	def clear_frame(self, frame):
		for widget in frame.winfo_children():
			widget.destroy()

	def add_action_button(self, text, command):
		button = tkinter.Button(self.actions_frame, text=text, command=command, width=224)
		button.pack(side=TOP, pady=(0, 8))

	def add_action_message(self, text):
		message = tkinter.Label(self.actions_frame, text=text, font=self.font_body, justify=LEFT, fg=color_text, bg=color_bg)
		message.pack(side=TOP, anchor="nw")

	def game_changed(self, event):
		self.send_message(message=f"Game changed to {self.game.get()}")

	#
	# main loop
	#

	def __init__(self, window, window_title, window_resolution):

		#
		# window setup
		#
		
		self.window = window
		self.window.title(window_title)
		self.window.geometry(window_resolution)
		self.window.resizable(False, False)
		self.window["background"] = color_bg
		
		#
		# defs
		#
		
		# text styling
		self.font_header = "Arial 20 bold"
		self.font_subheader = "Arial 16 bold"
		self.font_body = "Arial 12"
		self.font_body_bold = "Arial 12 bold"
		self.font_small = "Arial 9"
		self.font_small_bold = "Arial 9 bold"

		#
		# main window
		#

		# file listbox

		self.file_listbox_header = tkinter.Label(self.window, text="Files", font=self.font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
		self.file_listbox_header.place(x=16, y=16)

		self.file_listbox = tkinter.Listbox(self.window, selectmode="single", fg=color_text, bg=color_bg_dark)
		self.file_listbox.bind('<Double-Button-1>', self.parse_file)
		self.file_listbox.place(x=16, y=48, width=192, height=320)

		self.file_directory = tkinter.Entry(self.window, fg=color_black, bg=color_white)
		self.file_directory.place(x=80, y=384, width=464, height=24)
		self.file_directory.configure(wrap=None)
		self.file_directory.bind('<Return>', self.parse_gamedir)

		self.file_listbox_loadbutton = tkinter.Button(self.window, text="Browse...", command=self.choose_gamedir)
		self.file_listbox_loadbutton.place(x=16, y=384)

		# file info

		self.file_info_header = tkinter.Label(self.window, text="File Info", font=self.font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
		self.file_info_header.place(x=224, y=16)

		self.file_info = tkinter.Text(self.window, fg=color_text, bg=color_bg_dark)
		self.file_info.place(x=224, y=48, width=320, height=320)
		self.file_info.bind("<Key>", lambda e: "break")

		# actions

		self.actions_header = tkinter.Label(self.window, text="Actions", font=self.font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
		self.actions_header.place(x=560, y=16)

		self.actions_frame = tkinter.Frame(self.window, bg=color_bg)
		self.actions_frame.place(x=560, y=48, width=224, height=320)


		#self.game_select_header = tkinter.Label(self.window, text="Game", font=self.font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
		#self.game_select_header.place(x=560, y=384)

		self.game = tkinter.StringVar()
		self.game_select_combobox = Combobox(self.window, textvariable=self.game)
		self.game_select_combobox["values"] = ("Quake", "PowerSlave (Experimental)", "Duke Nukem 3D (Experimental)", "PowerSlave PSX (Experimental)")
		self.game_select_combobox.place(x=560, y=384, width=224, height=24)
		self.game_select_combobox.set("Quake")
		self.game_select_combobox['state'] = "readonly"
		self.game_select_combobox.bind('<<ComboboxSelected>>', self.game_changed)

		# console

		self.console_header = tkinter.Label(self.window, text="Console", font=self.font_subheader, justify=LEFT, fg=color_text, bg=color_bg)
		self.console_header.place(x=16, y=424)

		self.console = tkinter.Text(self.window, fg=color_text, bg=color_bg_dark)
		self.console.place(x=16, y=456, width=768, height=128)
		self.console.bind("<Key>", lambda e: "break")

		#
		# alert box
		#

		#self.overlay_image = PhotoImage(file="./assets/overlay.png")
		#self.overlay = tkinter.Canvas.create_image(800, 600, anchor=NE, image=self.overlay_image)

		#self.alertbox = tkinter.Frame(self.window, bg=color_bg)
		#self.alertbox.place(x=200, y=100, width=400, height=400)

		#
		# window init
		#

		self.add_action_message(text="No file loaded.")
		self.send_message(message="Program loaded.")

		self.window.mainloop()

if len(sys.argv) > 1:

	#
	# funcs
	#

	def compute_grayscale(item, container):
		pixels = []

		for item in container:
			pixels.append([item, item, item, True])

		return pixels

	def compute_palette(item, container):
		palette_entries = []

		for item in container:
			palette_entries.append([(item.r / 31), (item.g / 31), (item.b / 31), item.a])

		return palette_entries

	def compute_texture_paletted(container, imagesize, palette):
		pixels = numpy.zeros([imagesize[1], imagesize[0], 4], dtype=numpy.uint8)

		for y in range(imagesize[1]):
			for x in range(imagesize[0]):
				pos = (y * imagesize[0]) + x
				#pos = ((imagesize[1] - y - 1) * imagesize[0]) + x
				pixel = palette[container[pos]]
				pixels[y, x, 0] = pixel[0] * 255
				pixels[y, x, 1] = pixel[1] * 255
				pixels[y, x, 2] = pixel[2] * 255
				pixels[y, x, 3] = pixel[3] * 255

		return pixels

	def write_png(imagename, array):
		image = Image.fromarray(array)
		image.save(imagename)

	def parse_pic(file):
		pic = SlavedriverPicQuake.from_file(file)
		if outputfile == "":
			out = f"{outputfile_dir}{inputfile_tuple[0]}.png"
		else:
			out = outputfile
		palette = compute_palette(pic.PaletteEntryT, pic.palette)
		pixels = compute_texture_paletted(pic.bitmap, (pic.width, pic.height), palette)
		write_png(out, pixels)

		if exists(out):
			print(f"File saved: {out}")
		else:
			print(f"Error: Failed to save image {os.path.basename(out)}")

	def parse_lev(file, type):
		lev = SlavedriverLevQuake.from_file(file)

		if type == "textures":
			numTextures = 0

			for resource in lev.resources.resources:
				if resource.resource_type == 130:

					if outputfile == "":
						out = f"{outputfile_dir}{inputfile_tuple[0]}_texture{numTextures:04d}.png"
					else:
						out = f"{outputfile}{numTextures:04d}.png"

					texture = resource.data

					palette = compute_palette(lev.PaletteEntryT, texture.palette)
					pixels = compute_texture_paletted(texture.bitmap, (64, 64), palette)
					write_png(out, pixels)

					if exists(out):
						print(f"File saved: {out}")
					else:
						print(message=f"Error: Failed to save image {out}")

					numTextures += 1
		elif type == "sounds":
			for i, sound in enumerate(lev.resources.sounds):
				num_channels = 1
				samples_per_second = 11025
				bytes_per_sample = sound.bits // 8
				bytes_per_frame = num_channels * bytes_per_sample
				num_frames = sound.len_samples // bytes_per_frame

				if outputfile == "":
					out = f"{outputfile_dir}{inputfile_tuple[0]}_sound{i:04d}.wav"
				else:
					out = f"{outputfile}{i:04d}.png"

				if sound.bits == 8:
					s8_samples = numpy.frombuffer(sound.samples, dtype="i1")
					u8_samples = (s8_samples+128).astype("u1")
					samples = u8_samples.tobytes()
				elif sound.bits == 16:
					s16be_samples = numpy.frombuffer(sound.samples, dtype=">i2")
					s16le_samples = s16be_samples.astype("<i2")
					samples = s16le_samples.tobytes()
				else:
					raise ValueError("Expected 8 or 16 bit samples, but found something else!")

				with wave.open(out, "wb") as w:
					w.setnchannels(num_channels)
					w.setsampwidth(bytes_per_sample)
					w.setframerate(samples_per_second)
					w.setnframes(num_frames)
					w.writeframes(samples)

				if exists(out):
					print(f"File saved: {out}")
				else:
					print(f"Error: Failed to save sound {out}")

	#
	# argv parsing
	#

	inputfile = ""
	outputfile = ""
	game = "quake"
	outputtype = ""
	valid_games = ["quake", "duke3d", "powerslave", "powerslave_psx"]
	try: opts, args = getopt.getopt(sys.argv[1:], "hi:o:g:t:")
	except getopt.GetoptError:
		print("Invalid arguments provided.")
		sys.exit(2)
	for opt, arg in opts:
		if opt == "-h" or opt == "--help":
			print("")
			print("Example Useage:")
			print("gui.py -i DRKLOGO.PIC -o drklogo_converted.png -g quake")
			print("")
			print("Valid Games:")
			print("quake duke3d powerslave powerslave_psx")
			print("")
			print("Valid Input Formats:")
			print("Quake: .lev .pic")
			print("PowerSlave: .lev")
			print("PowerSlave PSX: .lev")
			print("Duke Nukem 3D: .lev")
			print("")
			print("Valid Output Types:")
			print("PIC: png")
			print("LEV: textures sounds")
			sys.exit()
		elif opt in ("-i"):
			inputfile = arg
		elif opt in ("-o"):
			outputfile = arg
		elif opt in ("-g"):
			game = arg.lower()
		elif opt in ("-t"):
			outputtype = arg.lower()

	inputfile_dir = split(inputfile)[0]
	outputfile_dir = split(outputfile)[0]

	inputfile_tuple = splitext(os.path.basename(inputfile))
	outputfile_tuple = splitext(os.path.basename(outputfile))

	#
	# error handling
	#

	if game not in valid_games:
		print("Invalid game specified.")
		sys.exit(2)

	if inputfile == "":
		print("No input file specified.")
		sys.exit(2)

	if not exists(inputfile):
		print("Could not find input file.")
		sys.exit(2)

	if not isdir(outputfile_dir):
		outputfile_dir = f"./{outputfile_dir}"
		if not isdir(outputfile_dir):
			print("Output directory does not exist.")
			sys.exit(2)

	#
	# file parsing
	#

	if game == "quake":
		if inputfile_tuple[1].lower() == ".pic":
			if outputtype == "png":
				parse_pic(inputfile)
			elif outputtype == "":
				print("No output type selected, assuming png.")
				parse_pic(inputfile)
			else:
				print("Invalid output type for input file.")
				print("Valid types: png")
		elif inputfile_tuple[1].lower() == ".lev":
			if outputtype != "textures" and outputtype != "sounds":
				print("Invalid output type for input file.")
				print("Valid types: textures sounds")
				sys.exit(2)
			elif outputtype == "":
				print("You must supply an output type for this file.")
				print("Valid types: textures sounds")
				sys.exit(2)
			else:
				parse_lev(inputfile, outputtype)
	elif game == "powerslave":
		print("PowerSlave support is experimental.")
	elif game == "powerslave_psx":
		print("PowerSlave PSX support is experimental.")
	elif game == "duke3d":
		print("Duke Nukem 3D support is experimental.")
else:
	main_display(window=tkinter.Tk(), window_title="Liberator", window_resolution="800x600")