#!/bin/bash
for FILE in *.ksy
do
    ksc --target javascript --outdir $PWD/../../dist_server/formats/ ${FILE%%.*}.ksy
done