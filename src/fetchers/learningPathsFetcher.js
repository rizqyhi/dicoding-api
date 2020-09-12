const fetch = require('node-fetch')
const cheerio = require('cheerio')

const PAGE_URL = 'https://www.dicoding.com/learningpaths'

module.exports = {
    async run() {
        const learningPaths = await this.fetchLearningPathUrls()

        return Promise.all(learningPaths.map(this.fetchLearningPath))
    },

    async fetchLearningPathUrls() {
        const response = await fetch(PAGE_URL)
        const $ = cheerio.load(await response.text())

        return $('.row.bg-light.shadow.rounded.mb-3 h2 a').map(function () {
            return $(this).attr('href')
        }).get()
    },

    async fetchLearningPath(learningPathUrl) {
        const response = await fetch(learningPathUrl)
        const $ = cheerio.load(await response.text())

        const description = $('.card.card-body.bg-light.shadow > p').map(function () {
            return $(this).text()
        }).get().join("\n")

        const courses = $('.card.card-body.bg-light.shadow > div h2 a').map(function () {
            return parseInt($(this).attr('href').match(/(\d+)/g)[0])
        }).get()
            
        return {
            id: parseInt(learningPathUrl.match(/(\d+)/g)[0]),
            name: $('.container-hero h2').text().trim(),
            link: learningPathUrl,
            logo: $('.container-hero img').attr('src'),
            description,
            courses
        }
    }
}
