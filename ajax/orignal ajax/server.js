
const express = require("express")
const app = express()
/* 创建路由规则
    request 是对请求报文的封装
    response是对响应报文的封装
*/
app.get('/server', (request, response) => {
    //set response header 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    
    //set response 
    response.send('Hello, ajax')
    
})

//针对IE缓存
app.get('/ie', (request, response) => {
    //set response header 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    
    //set response 
    response.send('Hello, IE - 2')
    
})

//延迟响应
app.get('/delay', (request, response) => {
    //set response header 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')
    setTimeout(() => {
        response.send('延迟响应')
    },3000)
    //set response 
   
    
})


//app.post('/server', (request, response) => {
//all 可以接受任意类型的请求
app.all('/server', (request, response) => {
    //set response header 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')

    //所有响应头都可以设置
    response.setHeader('Access-Control-Allow-Headers', '*')
    
    //set response 
    response.send('Hello, ajax post')
    
})

app.all('/json-server', (request, response) => {
    //set response header 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*')

    //所有响应头都可以设置
    response.setHeader('Access-Control-Allow-Headers', '*')
    
    //响应一个对象
    const data = {
        firstname:'jin'
    }

    //对对象进行字符串的转化
    let str = JSON.stringify(data)

    //set response 
    response.send(str)
    
})

//监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动，8000端口监听中")
})