const fetch = require('node-fetch')
const cheerio = require('cheerio')

// const PAGE_URL = 'http://dicoding.local/academies/list'
const PAGE_URL = 'https://www.dicoding.com/academies/list'

module.exports = {
    async run() {
        const pageSource = await this.fetchPage()
        const courses = this.parse(pageSource)

        return courses
    },

    async fetchPage() {
        const response = await fetch(PAGE_URL)

        return response.text()
    },

    parse(pageSource) {
        const $ = cheerio.load(pageSource)

        return $('.new-card-list').map(function() {
            return {
                id: parseInt($(this).find('a').attr('href').match(/(\d+)/g)[0]),
                name: $(this).find('.content-title').text().trim(),
                description: $(this).find('.cta-to-detail > a div').eq(2).text().trim(),
                logo: $(this).find('img').data('original'),
                link: $(this).find('a').attr('href'),
                students: parseInt($(this).find('.left-footer-text').text().trim().replace(' siswa terdaftar', '').replace('.', '')),
                modules: parseInt($(this).find('.cta-to-detail > a div:first-child span:nth-child(1)').text().replace(' Modul', '')),
                hours: parseInt($(this).find('.cta-to-detail > a div:first-child span:nth-child(2)').text().replace(' Jam', '')),
                rating: parseFloat($(this).data('rating').toFixed(2)),
                levels: `${$(this).data('level')}`.split(',').map(x => parseInt(x)),
                platforms: `${$(this).data('platform')}`.split(',').map(x => parseInt(x)),
                type: $(this).data('type'),
                learningPaths: $(this).data('path').split(','),
            }
        }).get()
    }
}
