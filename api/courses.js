const courses = require('../data/courses.json')

module.exports = (req, res) => {
    res.json(courses)
}
