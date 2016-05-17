# 淘宝NPM
NPM_REGISTRY = "--registry=http://registry.npm.taobao.org"

# 执行npm包安装命令
install:
	@npm install $(NPM_REGISTRY)

run:
	@node app.js

# Linux nohup(进程后台执行)
# PM2 allows to restart an application based on a memory limit.
# Use >> to append
# File descriptor 1 is the standard output (stdout).
# File descriptor 2 is the standard error (stderr).
# 2>1 may look like a good way to redirect stderr to stdout. 
# However, it will actually be interpreted as "redirect stderr to a file named 1". 
# & indicates that what follows is a file descriptor and not a filename.
# 把stderr流指向stdout，并都写入cnode.log
# -i 0: 
# Will start maximum processes with LB depending on available CPUs
start: install
	@NODE_ENV=production nohup pm2 start app.js -i 0 --name "soofruit" --max-memory-restart 400M >> /var/web/www/soofruit.log 2>&1 &

restart: install
	@NODE_ENV=production nohup pm2 restart "soofruit" >> /var/web/www/soofruit.log 2>&1 &

# 强制别名（伪文件）
.PHONY: install run start restart