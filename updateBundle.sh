cd ..
cd resume
npm i
bower i
git stash
npm run compile
cp dist/index_bundle.js ../git-resume-prod
cd ..
cd git-resume-prod
# git add index_bundle.js