#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run build

# 进入生成的文件夹
cd ./.vuepress/dist

# deploy to github pages
git init
git add -A
git commit -m 'deploy'
# git push -f $githubUrl master:gh-pages # 推送到github gh-pages分支
git push -f https://github.com/willysliang/static_blog.git master:gh-pages

cd -
rm -rf ./.vuepress/dist