#
# python modules
#

import sys, os, os.path
from descent_pig import DescentPig
from descent_pal import DescentPal
import numpy
from PIL import Image

inputFile = "/home/jaycie/Projects/Liberator/test_files/descent/descent.pig"
inputFilePalette = "/home/jaycie/Projects/Liberator/test_files/descent/descent/palette.256"

# inputFile = sys.argv[-1]
outputFilePath = f"{os.path.split(inputFile)[0]}{os.sep}{os.path.splitext(os.path.split(inputFile)[1])[0]}_extracted{os.sep}"

if not os.path.exists(outputFilePath):
	os.makedirs(outputFilePath)

def compute_palette(item, container):
	palette_entries = []

	for item in container:
		palette_entries.append([(item.r / 63), (item.g / 63), (item.b / 63), True])

	return palette_entries

def compute_texture_paletted(container, imagesize, palette, bFlip, bHasTransparency):
	pixels = numpy.zeros([imagesize[1], imagesize[0], 4], dtype=numpy.uint8)

	for y in range(imagesize[1]):
		for x in range(imagesize[0]):
			if bFlip:
				pos = ((imagesize[1] - y - 1) * imagesize[0]) + x
			else:
				pos = (y * imagesize[0]) + x
			pixel = palette[container[pos]]
			pixels[y, x, 0] = pixel[0] * 255
			pixels[y, x, 1] = pixel[1] * 255
			pixels[y, x, 2] = pixel[2] * 255

			if container[pos] == 255 and bHasTransparency == True:
				pixels[y, x, 3] = 0
			else:
				pixels[y, x, 3] = pixel[3] * 255

	return pixels

def write_png(filename, array):
	image = Image.fromarray(array)
	image.save(filename)

pigFile = DescentPig.from_file(inputFile)
palFile = DescentPal.from_file(inputFilePalette)

palette = compute_palette(DescentPal.PaletteEntryT, palFile.palette)

RLE_CODE = 224

for i, DescentPig.BitmapHeaderT in enumerate(pigFile.bitmaps):
	bitmap = DescentPig.BitmapHeaderT

	outputFile = f"{outputFilePath}{i}-{bitmap.name}.png"

	bHasTransparency = False

	if bitmap.flags & 1:
		bHasTransparency = True

	if bitmap.flags & 8:
		print(f"Extracting RLE-compressed bitmap: {bitmap.name}")
		rleRuns = bitmap.get_rle_data.run_lengths
		rlePixels = bitmap.get_rle_data.pixels

		linearData = []

		run = 0
		step = 0

		for run in rleRuns:
			scanline = rlePixels[step:step + run - 1]
			p = 0
			while p < len(scanline):
				pixel = scanline[p]
				p += 1
				if pixel & RLE_CODE ==RLE_CODE:
					count = pixel & ~RLE_CODE
					pixel = scanline[p]
					p += 1
					for x in range(count):
						linearData.append(pixel)
				else:
					linearData.append(pixel)
			step += run

		pixels = compute_texture_paletted(linearData, [bitmap.width, bitmap.height], palette, False, bHasTransparency)
		write_png(outputFile, pixels)
	else:
		print(f"Extracting linear bitmap: {bitmap.name}")
		pixels = compute_texture_paletted(bitmap.get_linear_data, [bitmap.width, bitmap.height], palette, False, bHasTransparency)
		write_png(outputFile, pixels)