function minReadFile(path) {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}
minReadFile('./resource/content.txt').then(value => {
    console.log(value.toString())
}, reason => {
    console.log(reason)
})