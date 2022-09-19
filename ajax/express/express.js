
const express = require("express")
const app = express()
/* 创建路由规则
    request 是对请求报文的封装
    response是对响应报文的封装
*/
app.get('/serve', (request, response) => {
    //set response header 设置允许跨域
    response.setHeader('Access-Controll-Allow-Origin','*')
    //set response 
    response.send('Hello, ajax')
    
})

//监听端口启动服务
app.listen(8000, () => {
    console.log("8000 is working")
})
