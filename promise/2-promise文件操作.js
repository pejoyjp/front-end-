const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')
/*
fs.readFile('./resource/content.txt', (err, data) => {
    if (err) throw err
    console.log(data.toString())
})
*/
//promise实现
let p = new Promise((resolve, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        if (err) reject(err)
        resolve(data)
    })
})
p.then(value => {
    console.log(value.toString())
}, reason => {
    console.log(reason)
})