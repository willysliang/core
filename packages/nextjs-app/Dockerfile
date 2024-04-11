# 使用官方Node.js作为基础镜像
FROM node:alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 复制项目文件到工作目录
COPY . .

# 安装依赖
RUN npm install

# 构建Next.js应用
RUN npm run build

# 暴露3000端口
EXPOSE 3000

# 运行Next.js应用
CMD ["npm", "start"]

# 构建并运行你的 Docker 容器
# docker build -t nextjs-app .
# docker run -p 3000:3000 nextjs-app
