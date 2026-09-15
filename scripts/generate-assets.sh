#!/usr/bin/env bash
# Generates derivative assets

set -euo pipefail

# input file, output file, quality
jpeg () {
  cjpegli "$1" "$2" -q "$3"
}

# input file, output file, quality
webp () {
  cwebp \
    -q "$3" \
    -m 6 \
    -pass 10 \
    -af \
    -sns 100 \
    -sharp_yuv \
    -metadata none \
    -mt "$1" -o "$2"
}

# input file, output file, quality
avif_photo () {
  avifenc \
    -q "$3" \
    -a tune=ssim \
    --depth 10 \
    --yuv 420 \
    --speed 0 \
    --ignore-icc \
    "$1" "$2"
}

avif_graphic () {
  avifenc \
    -q "$3" \
    --depth 8 \
    --yuv 444 \
    --speed 0 \
    --ignore-icc \
    "$1" "$2"
}

# input file, output file, resolution
resize () {
  magick "$1" -filter LanczosSharp -resize "$3" -strip "$2"
}

jpeg src/assets/ethan-hawksley.png public/ethan-hawksley.jpg 80
webp src/assets/ethan-hawksley.png public/ethan-hawksley.webp 80
avif_photo src/assets/ethan-hawksley.png public/ethan-hawksley.avif 30
cp src/assets/ethan-hawksley.png public/ethan-hawksley.png

TMP_PNG=$(mktemp --suffix=.png)
resize src/assets/ethan-hawksley.png "$TMP_PNG" 360x360
avif_photo "$TMP_PNG" src/assets/ethan-hawksley-360.avif 50

TMP_PNG=$(mktemp --suffix=.png)
resize src/assets/ethan-hawksley.png "$TMP_PNG" 112x112
avif_photo "$TMP_PNG" src/assets/ethan-hawksley-112.avif 50

avif_graphic src/assets/the-second-maintainer.png public/the-second-maintainer/the-second-maintainer.avif 30
jpeg src/assets/the-second-maintainer.png public/the-second-maintainer/the-second-maintainer.jpg 80
cp src/assets/the-second-maintainer.png public/the-second-maintainer/the-second-maintainer.png

TMP_PNG=$(mktemp --suffix=.png)
resize src/assets/the-second-maintainer.png "$TMP_PNG" 400x640
avif_graphic "$TMP_PNG" src/assets/the-second-maintainer-400x640.avif 40
