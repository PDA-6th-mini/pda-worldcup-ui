pnpm run build

pm2 stop "pda-worldcup-ui"

pm2 delete "pda-worldcup-ui"

pm2 start pnpm --name "pda-worldcup-ui" -- run start