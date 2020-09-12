const learningPaths = require('../data/learning-paths.json')

module.exports = (req, res) => {
    res.json(learningPaths)
}
