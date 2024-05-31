# git.clean.sh 文件作用: 减少 .git 目录的大小
# 使用方法: 在控制台中执行 `$ ./scripts/git-clean.sh`

# 清理未跟踪的文件
git clean -fdx

# 移除未引用的对象
git prune

# 进行垃圾收集和优化
git gc --aggressive --prune=now

# 使用 BFG Repo-Cleaner 删除大文件（如果需要）
# bfg --strip-blobs-bigger-than 100M
# git reflog expire --expire=now --all && git gc --prune=now --aggressive

# 或者使用 git filter-repo 删除大文件（如果需要）
# git filter-repo --strip-blobs-bigger-than 100M

# 删除不需要的分支
# git branch -D branch_name
# git push origin --delete branch_name
