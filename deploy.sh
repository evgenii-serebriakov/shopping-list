set -e

npm run build

cd dist

git init
git add -A
git commit -m 'Deploy'

git push -f git@github.com:evgenii-serebriakov/shopping-list.git master:gh-pages

cd -