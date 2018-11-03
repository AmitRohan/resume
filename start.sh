ip=$(./node_modules/.bin/dev-ip)
ip=$(echo $ip | grep -oE '[0-9.]+')
pulp --watch --then "./node_modules/.bin/webpack-dev-server --config webpack.config.js --content-base dist/ --host 0.0.0.0 --port 8080" build

