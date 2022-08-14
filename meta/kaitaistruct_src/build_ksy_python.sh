#!/bin/bash
for FILE in *.ksy
do
    ksc --target python --outdir $PWD/../python_test_new/ ${FILE%%.*}.ksy
done