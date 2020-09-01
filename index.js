const fs = require('fs')
const coursesFetcher = require('./src/fetchers/coursesFetcher');

(async () => {
    const courses = await coursesFetcher.run()

    fs.writeFileSync('./data/courses.json', JSON.stringify(courses, null, 2))
})()
