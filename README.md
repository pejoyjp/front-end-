# front-end-
Ajax/Promise/Axios


const axios = require('axios')
const cheerio = require('cheerio')
const a = async function(){
    const res = await axios({
        method: 'get',
        url: 'https://m.huilv.cc/EUR_CNY/',
        
    })
    let $ = cheerio.load(res.data)
    console.log($('.point_price').text())
}
a()
