#
# python modules
#

import sys, getopt, os, os.path, re

import tkinter
from tkinter import *
from tkinter import ttk

#
# custom modules
#

import kaitaistruct

from formats import descent_hog, descent_pig
from formats import id_pak
from formats import valve_vpk
from formats import volition_vpp
from formats import slavedriver_lev_duke, slavedriver_lev_quake, slavedriver_pcs_powerslave, slavedriver_pic_quake

#
# defs
#

actions_archive = {
	"extract": "Dump the contents of the archive to the specified directory.",
	"extract-images": "If the container contains images, dump them to the specified directory",
	"extract-sounds": "If the container contains sounds, dump them to the specified directory",
	"list": "List the contents of the archive."
}

actions_image = {
	"convert": "Convert the image file to PNG."
}

actions_generic = {
	"structure": "Print the structure of the binary file."
}

help_text = "Liberator 0.0.1\n"
help_text += "Usage: -i <inputfile> -t <type> -a <action> -o <output>\n\n"
help_text += "Valid input types:\n"
help_text += "- Container Formats:\n"
help_text += "  - BRender Engine:\n"
help_text += "    - Datafile: brender\n"
help_text += "  - Descent:\n"
help_text += "    - Hogfile: descent_hog\n"
help_text += "    - Pigfile: descent_pig\n"
help_text += "  - id Software:\n"
help_text += "    - Packfile: id_pak\n"
help_text += "  - Microsoft 3D Movie Maker:\n"
help_text += "    - Chunkfile: ms3dmm\n"
help_text += "  - SlaveDrive Enginer:\n"
help_text += "    - Quake Level: slavedriver_lev_quake\n"
help_text += "    - Duke3D Level: slavedriver_lev_duke\n"
help_text += "    - Bitmap Collection: slavedriver_pcs\n"
help_text += "  - Valve:\n"
help_text += "    - Packfile: valve_vpk\n"
help_text += "  - Volition:\n"
help_text += "    - Packfile: volition_vpp\n"
help_text += "- Image Formats:\n"
help_text += "  - SlaveDrive Enginer:\n"
help_text += "    - Bitmap: slavedriver_pic\n"

window_color_bg = "#171717"
window_color_bg_dark = "black"
window_color_text = "white"
window_color_black = "black"
window_color_white = "white"

#
# tkinter main
#

class main_display:
	def __init__(self, window, window_title, window_resolution):

		self.window = window
		self.window.title(window_title)
		self.window.geometry(window_resolution)
		self.window.resizable(True, True)
		self.window["background"] = window_color_bg

		self.style = ttk.Style(self.window)
		self.style.theme_use("clam")

		self.style.configure(
			"Treeview", background=window_color_bg_dark, fieldbackground=window_color_bg_dark, foreground=window_color_text,
		)

		#
		# configure grid
		#

		self.window.columnconfigure(0, weight=1)
		self.window.columnconfigure(1, weight=1)
		self.window.columnconfigure(2, weight=1)

		self.window.rowconfigure(0, weight=1)
		self.window.rowconfigure(1, weight=1)
		self.window.rowconfigure(2, weight=1)
		self.window.rowconfigure(3, weight=1)

		#
		# window elements
		#

		self.filetree = ttk.Treeview(self.window)

		self.filetree["columns"] = ("type", "size")
		self.filetree.heading("#0", text="Name")
		self.filetree.column("#0", minwidth=100) 
		self.filetree.heading("type", text="Type")
		self.filetree.column("type", minwidth=100)
		self.filetree.heading("size", text="Size")
		self.filetree.column("size", minwidth=100)
		self.filetree.grid(column=0, columnspan=1, row=0, rowspan=4, sticky="NESW", padx=8, pady=8)

		self.filetree.insert("", "end", text="Line 1", values=("1A", "1b"))
		self.filetree.insert("", "end", text="sub dir 2", values=("2A", "2B"))

		self.file_info = tkinter.Text(self.window, fg=window_color_text, bg=window_color_bg_dark)
		self.file_info.grid(column=1, columnspan=1, row=0, rowspan=2, sticky="NESW", padx=8, pady=8)

		self.temp1 = tkinter.Text(self.window, fg=window_color_text, bg=window_color_bg_dark)
		self.temp1.grid(column=1, columnspan=1, row=2, rowspan=2, sticky="NESW", padx=8, pady=8)

		self.temp2 = tkinter.Text(self.window, fg=window_color_text, bg=window_color_bg_dark)
		self.temp2.grid(column=2, columnspan=1, row=0, rowspan=3, sticky="NESW", padx=8, pady=8)

		self.temp3 = tkinter.Text(self.window, fg=window_color_text, bg=window_color_bg_dark)
		self.temp3.grid(column=2, columnspan=1, row=3, rowspan=1, sticky="NESW", padx=8, pady=8)

		#
		# main loop
		#

		self.window.mainloop()

main_display(window=tkinter.Tk(), window_title="Liberator", window_resolution="1280x720")

#
# main
#

inputFile = ""
inputType = ""
inputAction = ""
outputFile = ""

try: opts, args = getopt.getopt(sys.argv[1:], "hi:o:a:t:", ["input=", "output=", "action=", "type="])
except getopt.GetoptError:
	print(help_text)
	sys.exit(2)

for opt, arg in opts:
	if opt in ("-h", "--help"):
		print(help_text)
		sys.exit()
	elif opt in ("-i", "--input"):
		inputFile = arg
	elif opt in ("-o", "--output"):
		outputFile = arg
	elif opt in ("-a", "--action"):
		inputAction = arg
	elif opt in ("-t", "--type"):
		inputType = arg

#
# error handling
#

if len(sys.argv) < 2:
	print(help_text)
	sys.exit(2)

if len(sys.argv) == 2:
	inputFile = sys.argv[-1]

if inputFile == "":
	print("No input files specified.")
	sys.exit(2)

if not os.path.exists(inputFile):
	print("Could not find input file.")
	sys.exit(2)

inputFilePath = os.path.split(inputFile)[0] + os.sep
inputFileName = os.path.split(inputFile)[1]
inputFileNameNoExt = os.path.splitext(inputFileName)[0]
inputFileExt = os.path.splitext(inputFileName)[1]

outputFileName = os.path.split(outputFile)[1]
outputFileNameNoExt = os.path.splitext(outputFileName)[0]
outputFileExt = os.path.splitext(outputFileName)[1]

if outputFile == "":
	print(f"No output specified, assuming path...")
	outputFile = inputFilePath + inputFileNameNoExt + ".map"

if inputFileExt == ".vmf":
	VMFtoMAP(inputFile, outputFile)
elif inputFileExt == ".rmf":
	RMFtoMAP(inputFile, outputFile)
else:
	print("Unrecognzied input file type.")
	sys.exit(2)