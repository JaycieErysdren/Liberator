#
# python modules
#

import os, os.path
import numpy
from PIL import Image

from dvision_uvi import DvisionUvi

inputFile = "/media/jaycie/Erysdren/Archive/GameDev/RUNANDGUN! Movin' Pictures (1992 - 2002)/Chat Logs & Received Files/Tony Grossman (Tony Gold)/D-Vision AVS Files/CD2/3A/STIL000.UVI"
outputFilePath = os.path.split(inputFile)[0] + os.sep + os.path.splitext(os.path.split(inputFile)[1])[0] + os.sep

if not os.path.exists(outputFilePath):
	os.makedirs(outputFilePath)

uviFile = DvisionUvi.from_file(inputFile)

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
			pixels[y, x, 0] = pixel[0]
			pixels[y, x, 1] = pixel[1]
			pixels[y, x, 2] = pixel[2]
			pixels[y, x, 3] = pixel[3]

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

pixels_in = []
palette_in = []

#for i in uviFile.pixels:
#	pixel = uviFile.pixels[i]
#	pixels_in.append([pixel, pixel, pixel, 255])

for DvisionUvi.RgbT in uviFile.pixels:
	rgb = DvisionUvi.RgbT
	pixels_in.append([(rgb.r / 31) * 255, (rgb.g / 31) * 255, (rgb.b / 31) * 255, 255])
	#pixels_in.append([rgb.r, rgb.g, rgb.b, 255])

for DvisionUvi.RgbT in uviFile.palette:
	rgb = DvisionUvi.RgbT
	palette_in.append([(rgb.r / 31) * 255, (rgb.g / 31) * 255, (rgb.b / 31) * 255, 255])

pixels_out = compute_texture(pixels_in, [128, 140], False)
palette_out = compute_texture(palette_in, [64, 58], False)

write_png(f"{outputFilePath}image.png", pixels_out)
write_png(f"{outputFilePath}palette.png", palette_out)
