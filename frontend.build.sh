#! /bin/bash

echo "Installing dependencies..."
pnpm install

echo "Building..."
pnpm run build

echo "Stopping pm2..."
pm2 stop "pda-worldcup-ui"

echo "Deleting pm2..."
pm2 delete "pda-worldcup-ui"

echo "Starting pm2..."
pm2 start pnpm --name "pda-worldcup-ui" -- run start

echo "Done"