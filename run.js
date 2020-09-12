const fs = require('fs')
const coursesFetcher = require('./src/fetchers/coursesFetcher');
const learningPathsFetcher = require('./src/fetchers/learningPathsFetcher');

const fetchCourses = async () => {
    console.log('⏳ Fetching courses')
    const courses = await coursesFetcher.run()
    fs.writeFileSync('./data/courses.json', JSON.stringify(courses, null, 2))
    console.log('🗄 Courses fetched and saved')
}

const fetchLearningPaths = async () => {
    console.log('⏳ Fetching learning paths')
    const learningPaths = await learningPathsFetcher.run()
    fs.writeFileSync('./data/learning-paths.json', JSON.stringify(learningPaths, null, 2))
    console.log('🗄 Learning paths fetched and saved')
}

(async () => {
    await fetchCourses()
    await fetchLearningPaths()
})()
