#
# python modules
#

import sys, os, os.path
from descent_hog import DescentHog

# inputFile = "/home/jaycie/Projects/Liberator/test_files/descent/descent.hog"
inputFile = sys.argv[-1]
outputFilePath = os.path.split(inputFile)[0] + os.sep + os.path.splitext(os.path.split(inputFile)[1])[0] + os.sep

if not os.path.exists(outputFilePath):
    os.makedirs(outputFilePath)

hogFile = DescentHog.from_file(inputFile)

for hogFile.ChunkT in hogFile.chunks:
    chunk = hogFile.ChunkT
    print(f"Extracting {chunk.name} ({chunk.len_data} bytes)")
    outputFile = outputFilePath + chunk.name
    f = open(outputFile, "wb")
    f.write(chunk.data)
    f.close