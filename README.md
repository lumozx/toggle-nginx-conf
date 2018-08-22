# Nginx配置切换工具


#### 在home目录下新建`/nginxConf/index.js`文件，模板如下：
```
module.exports = {
    path: '/usr/local/etc/nginx/nginx.conf'
}
```
保存的nginx.conf地址

#### nginx.conf规范
```
server {
    #include servers/kong.conf;
    #include servers/qywx.conf;
    include servers/webapp.conf;
}
```
必须用include方式引入配置，且“#”与include之间无间隔。


### 运行命令

```
node changNginx.js
```

执行成功后，会以选单的方式，显示所有include的路径。

通过checkbox的方式选择或组合conf
