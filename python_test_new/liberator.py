#
# python modules
#

import sys, getopt, os, os.path, re

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

help_text = "Liberator 0.0.1\n"
help_text += "Usage: -i <inputfile> -t <type> -a <action> -o <output>\n\n"
help_text += "Valid input types:\n"
#help_text += "- BRender Engine:\n"
#help_text += "  - Datafile: brender\n"
help_text += "- Descent:\n"
help_text += "  - Hogfile: descent_hog\n"
help_text += "  - Pigfile: descent_pig\n"
help_text += "- id Software:\n"
help_text += "  - Packfile: id_pak\n"
#help_text += "- Microsoft 3D Movie Maker:\n"
#help_text += "  - Chunkfile: ms3dmm\n"
help_text += "- SlaveDrive Enginer:\n"
help_text += "  - Quake Level: slavedriver_lev_quake\n"
help_text += "  - Duke3D Level: slavedriver_lev_duke\n"
help_text += "  - Bitmap: slavedriver_pic\n"
help_text += "  - Bitmap Collection: slavedriver_pcs\n"
help_text += "- Valve:\n"
help_text += "  - Packfile: valve_vpk\n"
help_text += "- Volition:\n"
help_text += "  - Packfile: volition_vpp\n"

#
# main
#

inputFile = ""
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

#
# error handling
#

if len(sys.argv) < 2:
	print("No input files specified.")
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

#inputFile = "/home/jaycie/Projects/Amygdala/content/mapsrc/Mansion.vmf"
inputFilePath = os.path.split(inputFile)[0] + os.sep
inputFileName = os.path.split(inputFile)[1]
inputFileNameNoExt = os.path.splitext(inputFileName)[0]
inputFileExt = os.path.splitext(inputFileName)[1]

outputFileName = os.path.split(outputFile)[1]
outputFileNameNoExt = os.path.splitext(outputFileName)[0]
outputFileExt = os.path.splitext(outputFileName)[1]

if outputFile == "":
	print(f"No output filename specified, assuming {inputFileNameNoExt}.map")
	outputFile = inputFilePath + inputFileNameNoExt + ".map"

if inputFileExt == ".vmf":
	VMFtoMAP(inputFile, outputFile)
elif inputFileExt == ".rmf":
	RMFtoMAP(inputFile, outputFile)
else:
	print("Unrecognzied input file extension.")
	sys.exit(2)