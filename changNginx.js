var fs = require('fs')

var inquirer = require('inquirer');

var nginxConf = ''
var defaultArr = []
var noDefaultArr = []
var choicesArr = []

nginxConf = fs.readFileSync('/usr/local/etc/nginx/nginx.conf', 'utf8');
var regex3 = /include.*;/gm;
var nginxConfArr = nginxConf.match(regex3)


for (let i = 0; i < nginxConfArr.length; i++) {
	var start = nginxConf.indexOf(nginxConfArr[i])
	var end = start + nginxConfArr[i].length
	// console.log(end)
	var tag = nginxConf.substring(start - 1, start)
	tag !== '#' ? defaultArr.push(nginxConfArr[i]) : noDefaultArr.push(nginxConfArr[i])
	choicesArr.push({name:nginxConfArr[i],value:nginxConfArr[i]})
}

inquirer
	.prompt([
  		{
  	 		type: 'checkbox',
  	 		 name: 'nginxConfList',
    		message: '请选择切换的配置',
    		default: defaultArr,
    		choices: choicesArr
  		}
  	])
  	.then(answers => {
  		// console.log(answers)
  		for (let i = 0; i < defaultArr.length; i++) {
  			nginxConf = nginxConf.replace(defaultArr[i], '#' + defaultArr[i])
  		}
  		for (let j = 0; j < answers.nginxConfList.length; j++) {
  			nginxConf = nginxConf.replace('#' + answers.nginxConfList[j], answers.nginxConfList[j])
  		}
  	})
  	.then(() => {
  		fs.writeFileSync('/usr/local/etc/nginx/nginx.conf', nginxConf);
  	})
