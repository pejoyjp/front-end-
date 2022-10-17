const util = require('util')
const fs = require('fs')
let minReadFile = util.promisify(fs.readFile)
minReadFile('./resource/content.txt').then(value => {
    console.log(value.toString())
})