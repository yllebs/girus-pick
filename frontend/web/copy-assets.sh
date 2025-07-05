#!/bin/bash

# Ensure the public assets directory exists
mkdir -p build/assets/images

# Copy all images from src/assets to build/assets
cp -r src/assets/images/*.png build/assets/images/
cp -r src/assets/images/*.svg build/assets/images/ 2>/dev/null || :

# Create a symbolic link for assets for better access in development
if [ ! -L "build/assets" ]; then
  ln -sf $(pwd)/build/assets $(pwd)/node_modules/build/assets 2>/dev/null || :
fi

echo "Assets copied successfully!"
