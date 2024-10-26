const User = require('./User')
const Task = require('./Task')

User.hasMany(Task, { as: 'tasks', foreignKey: 'userId' })
Task.belongsTo(User, { foreignKey: 'userId' })