const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

function formatDateNum(num) {
  return num < 10 ? '0' + num : num
}

module.exports = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    const yy = value.getFullYear()
    const mm = formatDateNum(value.getMonth() + 1)
    const dd = formatDateNum(value.getDate())
    const h = formatDateNum(value.getHours())
    const m = formatDateNum(value.getMinutes())
    const s = formatDateNum(value.getSeconds())

    const time = `${yy}-${mm}-${dd} ${h}:${m}:${s}`

    return time;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});