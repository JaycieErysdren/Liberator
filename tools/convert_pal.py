#
# python modules
#

import sys, os, os.path
import numpy
from PIL import Image

from descent_pal import DescentPal

inputFile = "/home/jaycie/Projects/Liberator/test_files/descent/descent/palette.256"
# inputFile = sys.argv[-1]
outputFilePath = os.path.split(inputFile)[0] + os.sep + os.path.splitext(os.path.split(inputFile)[1])[0] + os.sep

if not os.path.exists(outputFilePath):
	os.makedirs(outputFilePath)

palFile = DescentPal.from_file(inputFile)

def compute_palette(item, container):
	palette_entries = []

	for item in container:
		palette_entries.append([(item.r / 63), (item.g / 63), (item.b / 63), True])

	return palette_entries

def compute_texture(item, imagesize, bFlip):
	pixels = numpy.zeros([imagesize[1], imagesize[0], 4], dtype=numpy.uint8)

	for y in range(imagesize[1]):
		for x in range(imagesize[0]):
			if bFlip:
				pos = ((imagesize[1] - y - 1) * imagesize[0]) + x
			else:
				pos = (y * imagesize[0]) + x
			pixel = item[pos]
			pixels[y, x, 0] = pixel[0] * 255
			pixels[y, x, 1] = pixel[1] * 255
			pixels[y, x, 2] = pixel[2] * 255
			pixels[y, x, 3] = pixel[3] * 255

	return pixels

def compute_texture_paletted(container, imagesize, palette, bFlip):
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
			pixels[y, x, 3] = pixel[3] * 255

	return pixels

def write_png(filename, array):
	image = Image.fromarray(array)
	image.save(filename)

palette = compute_palette(DescentPal.PaletteEntryT, palFile.palette)

colormap_pixels = compute_texture_paletted(palFile.fade_table, [256, 34], palette, True)
palette_pixels = compute_texture(palette, [16, 16], False)

write_png(f"{outputFilePath}palette.png", palette_pixels)
write_png(f"{outputFilePath}colormap.png", colormap_pixels)