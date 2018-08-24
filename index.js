#!/usr/bin/env node 
"use strict"
var fs = require('fs')
var inquirer = require('inquirer')
var homedir = require('home-dir')
var nginxPath = require(homedir('/nginxConf'))

var nginxConf = ''
var defaultArr = []
var choicesArr = []

nginxConf = fs.readFileSync(nginxPath.path, 'utf8');
var regex = /include.*;/gm;
var nginxConfArr = nginxConf.match(regex)


for (let i = 0; i < nginxConfArr.length; i++) {
	var start = nginxConf.indexOf(nginxConfArr[i])
	var tag = nginxConf.substring(start - 1, start)
	tag !== '#' ? defaultArr.push(nginxConfArr[i]) : ''
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
  		fs.writeFileSync(nginxPath.path, nginxConf)
      console.log('切换成功')
  	})
