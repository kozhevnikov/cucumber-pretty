require('should')
require('ts-node/register')

module.exports = {
  spec: ['test/*.ts'],
  'watch-files': ['lib/**/*.js', 'test/*.ts']
}