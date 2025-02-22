#!/bin/bash

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required but not installed. Please install it first."
    echo "On macOS: brew install imagemagick"
    echo "On Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

# Create necessary directories
mkdir -p assets/ios
mkdir -p assets/android
mkdir -p assets/web
mkdir -p assets/store

# Generate iOS icons
ios_sizes=(20 29 40 58 60 76 80 87 120 152 167 180 1024)
for size in "${ios_sizes[@]}"; do
    convert assets/icon-template.svg -resize ${size}x${size} assets/ios/icon-${size}.png
done

# Generate Android icons
android_sizes=(48 72 96 144 192 512)
for size in "${android_sizes[@]}"; do
    convert assets/icon-template.svg -resize ${size}x${size} assets/android/icon-${size}.png
done

# Generate web favicons
web_sizes=(16 32 48 64 96 128 256 512)
for size in "${web_sizes[@]}"; do
    convert assets/icon-template.svg -resize ${size}x${size} assets/web/favicon-${size}.png
done

# Generate ICO file with multiple sizes
convert assets/web/favicon-16.png assets/web/favicon-32.png assets/web/favicon-48.png assets/web/favicon-64.png assets/web/favicon.ico

# Generate store icons
convert assets/icon-template.svg -resize 1024x1024 assets/store/app-store.png
convert assets/icon-template.svg -resize 512x512 assets/store/play-store.png

echo "Icons generated successfully!"
echo "Don't forget to:"
echo "1. Add iOS icons to your Xcode project"
echo "2. Add Android icons to your res/mipmap directories"
echo "3. Add web favicons to your web manifest and HTML" 