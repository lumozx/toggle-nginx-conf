# Nginx配置切换工具

由于开发环境依赖dev1，因此就要监听80端口，但项目一多，nginx.conf的监听80端口变得臃肿且复杂
此项目由此而来

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
每个include都是一个项目配置


### 运行命令

```
node changNginx.js
```

执行成功后，会以选单的方式，显示所有include的路径。

通过checkbox的方式选择或组合conf
