#
# LIBERATOR IMAGE FUNCTION LIBRARY
#

import numpy
from PIL import Image

def compute_grayscale(container, imagesize):
	pixels = numpy.zeros([imagesize[1], imagesize[0], 4], dtype=numpy.uint8)

	for y in range(imagesize[1]):
		for x in range(imagesize[0]):
			pos = (y * imagesize[0]) + x
			pixel = container[pos]
			pixels[y, x, 0] = pixel
			pixels[y, x, 1] = pixel
			pixels[y, x, 2] = pixel
			pixels[y, x, 3] = False

	return pixels

def compute_palette(item, container):
	palette_entries = []

	for i, item in enumerate(container):
		palette_entries.append([(item.r / 31), (item.g / 31), (item.b / 31), item.a])

	return palette_entries

def compute_texture(item, imagesize):
	pixels = numpy.zeros([imagesize[1], imagesize[0], 4], dtype=numpy.uint8)

	for y in range(imagesize[1]):
		for x in range(imagesize[0]):
			pos = (y * imagesize[0]) + x
			pixel = item[pos]
			pixels[y, x, 0] = pixel[0] * 255
			pixels[y, x, 1] = pixel[1] * 255
			pixels[y, x, 2] = pixel[2] * 255
			pixels[y, x, 3] = pixel[3] * 255

	return pixels

def compute_texture_paletted(container, imagesize, palette):
	pixels = numpy.zeros([imagesize[1], imagesize[0], 4], dtype=numpy.uint8)

	for y in range(imagesize[1]):
		for x in range(imagesize[0]):
			pos = (y * imagesize[0]) + x
			# change pixel winding to flip image vertically
			#pos = ((imagesize[1] - y - 1) * imagesize[0]) + x
			pixel = palette[container[pos]]
			pixels[y, x, 0] = pixel[0] * 255
			pixels[y, x, 1] = pixel[1] * 255
			pixels[y, x, 2] = pixel[2] * 255
			pixels[y, x, 3] = pixel[3] * 255

	return pixels

def write_png(filename, array):
	image = Image.fromarray(array)
	image.save(filename)