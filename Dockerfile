# FROM nginx:latest

# COPY dist/  /usr/share/nginx/html/

# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# # 设置基础镜像
# FROM node:12-alpine
# # 设置工作目录
# WORKDIR /app
# # 将项目文件复制到工作目录中
# COPY . .
# # 安装项目依赖
# RUN npm install
# # 编译项目
# RUN npm run build
# # 设置NGINX镜像
# FROM nginx:alpine
# # 将构建的文件复制到NGINX配置的默认站点目录
# COPY dist/  /usr/share/nginx/html
# # 将自定义的NGINX配置文件复制到容器中
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# # 暴露80端口
# EXPOSE 80
# # 启动NGINX
# CMD ["nginx", "-g", "daemon off;"]

# # 使用node.js 14.x作为基础镜像
# FROM node:14

# # 设置工作目录
# WORKDIR /app

# # 将Vue.js应用程序的所有文件复制到工作目录中
# COPY . .

# # 安装依赖项
# RUN npm install

# # 构建生产版本
# RUN npm run build

# # 将Nginx作为Web服务器的基础镜像
# FROM nginx:latest

# # 将构建后的Vue.js应用程序复制到Nginx默认的静态文件夹
# COPY --from=0 /app/dist /usr/share/nginx/html

# # 将Nginx的默认配置文件替换为Vue.js应用程序的配置文件
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# # 暴露80端口
# EXPOSE 80

# # 启动Nginx服务器
# CMD ["nginx", "-g", "daemon off;"]
# 使用Node.js作为基础镜像
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 将应用程序文件复制到工作目录
COPY . .

# 安装依赖项并构建应用程序
RUN npm install && npm run build

# 暴露应用程序端口
EXPOSE 8080

# 启动应用程序
CMD ["npm", "run", "dev"]
