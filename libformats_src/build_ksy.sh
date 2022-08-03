#!/bin/bash
for FILE in *.ksy
do
    ksc --target python --outdir $PWD/../libformats/ ${FILE%%.*}.ksy
done