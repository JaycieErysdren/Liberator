#
# LIBERATOR SOUND FUNCTION LIBRARY
#

import numpy, wave

def write_wav(filename, num_channels, samples_per_second, bytes_per_sample, bytes_per_frame, num_frames, bits, samples):
	if bits == 8:
		s8_samples = numpy.frombuffer(samples, dtype="i1")
		u8_samples = (s8_samples+128).astype("u1")
		samples = u8_samples.tobytes()
	elif bits == 16:
		s16be_samples = numpy.frombuffer(samples, dtype=">i2")
		s16le_samples = s16be_samples.astype("<i2")
		samples = s16le_samples.tobytes()
	else:
		raise ValueError("Expected 8 or 16 bit samples, but found something else!")

	with wave.open(filename, "wb") as w:
		w.setnchannels(num_channels)
		w.setsampwidth(bytes_per_sample)
		w.setframerate(samples_per_second)
		w.setnframes(num_frames)
		w.writeframes(samples)