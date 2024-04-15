---
Author: willy
CreateTime: 2024-04-15 13:00:33
Modifier: willy
ModifierTime: 2024-04-15 13:00:47
Description: Nginx
---

## Nginx


### 地址匹配 location
location 用于定义URL匹配规则，以决定哪些请求会被转发到哪个配置区块进行处理。
它通常与 root 指令配合使用来指定处理这些请求的文件目录。
location 的作用是匹配请求的URI，并不改变该URI。


#### Nginx 静态文件中 root 和 alias 指令
1. root 指令
root 指令用来指定服务器上的一个目录作为请求的根目录，当触发请求时 Nginx 会将请求的 URL 直接附加到这个根目录后面，从而找到对应的文件。

2. alias 指令
alias 指令用来修改匹配到的location路径，实际上改变了请求资源的文件路径。
不同于 root，alias 会替换掉 location 匹配到的部分路径。

3. root 和 alias 区别在于指定路径的处理方式。
  - root: location 部分会附加到 root 部分的路径上，最终形成路径为 `root + location`
  - alias: location 部分将被替换为 alias 部分的路径，最终路径为 `alias`

```nginx
server {
  listen 80;
  server_name www.willy.com;

  # 用 root 指令处理主页
  location / {
    root /var/www/html;
    index index.html;
  }

  # 用 root 指令处理静态文件
  location /static/ {
    root /var/www/;
  }

  # 用 alias 指令处理图片目录
  location /images/ {
    alias /var/www/images/;
  }
}

# 说明
## 1. 主页处理：当访问 `http://www.willy.com/` 时，Nginx 会匹配到第一个 location 块。由于配置 `root /var/www/html;`，Nginx 会在 `/var/www/html/` 目录下查找 `index.html` 文件来响应这个请求。
## 2. 静态文件: 当访问 `http://www.willy.com/static/example.png` 会在 `/var/www/` 位置寻找 `example.png` 文件。
## 3. 图片处理：当访问 `http://www.willy.com/image/logo.png` 时，Nginx 匹配到第二个 location 块。通过配置 `alias /var/www/images/;`，Nginx 会在 `/var/www/images/` 目录下查找 `logo.png` 图片文件 (`/images/URI` 被替换成了文件系统上的路径 `/var/www/images/`)
```


### 重定向 rewrite
rewrite 模块负责静态重写，它允许使用正则表达式改变 URI，并根据变量来重定向以及选择配置。
语法: `rewrite patten replace flag`
  - patten 是正则表达式，与 patten 匹配的 URL 都会被改写成 replace，
  - flag 可选，有如下标志:
      - `last` — 完成 rewrite，然后搜索相应的 URI 和位置。
      - `break` — 中止 `rewrite`，不再匹配后面的规则
      - `redirect` — 返回 code 为 302 的临时重定向
      - `permanent` — 返回 code 为 301 的永久重定向
注意:
  - 当使用 rewrite 时，务必注意不要创建循环重定向，这会导致浏览器显示错误。
  - 在配置重定向时，需考虑 SEO (搜索引擎优化) 影响，特别是 301 重定向的使用。

```bash
1. 临时重定向 (302)
server {
  listen 80;
  server_name example.com;

  location /oldpage {
    return 302 /newpage;
  }
}


2. 永久重定向 (301)
server {
  listen 80;
  server_name example.com;

  location /oldpage {
    return 301 /newpage;
  }
}


3. 强制使用 Https
server {
  listen 80;
  server_name example.com;

  location /oldpage {
    return 302 https://example.com$request_uri;
  }
}


4. 非 www 到 www
server {
  listen 80;
  server_name example.com;

  location /oldpage {
    return 302 https://www.example.com$request_uri;
  }
}


5. www 到非 www
server {
  listen 80;
  server_name www.example.com;

  location /oldpage {
    return 302 https://example.com$request_uri;
  }
}


6. 使用 rewrite 重定向
server {
  listen 80;
  server_name example.com;
  rewrite ^/oldpage$ /newpage permanent;
}
```


#### 配置旧域名重定向到新域名
```bash
1. 将旧域名重定向到新域名上:
server {
  listen 443 ssl;
  server_name old.com;
  rewrite .* https://new.com;
}


2. 跳转到新域名上时要保留路径
server {
  listen 443 ssl;
  server_name old.domain.com;
  rewrite ^/(.*)$ https://new.domain.com/$1;
}

3. 如果域名不是 `www.new.domain.com`，旧统一跳转到 `https://www.new.domain.com`
server {
  listen 443 ssl;
  server_name old.domain.com new.domain.com example.com www.example.com;
  if ($host != 'www.new.domain.com') {
    rewrite ^/(.*)$ https://new.domain.com/$1 permanent;
  }
}


4. rewrite 与 location 配合实现图片文件跳转 CDN:
server {
  location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
    expires 30d;
    rewrite ^/uploadfile\/(.*)$ https://cdn.new.domain.com/uploadfile/$1;
  }
}
```
