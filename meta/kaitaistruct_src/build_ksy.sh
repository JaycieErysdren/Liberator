#!/bin/bash
for FILE in *.ksy
do
    ksc --target javascript --outdir $PWD/../../dist/js/formats/ ${FILE%%.*}.ksy
done