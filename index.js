const coursesFetcher = require('./src/fetchers/coursesFetcher');

(async () => {
    const courses = await coursesFetcher.run()

    console.log(courses)
})()
