const test = /CTK28|CTK28CD|CTK29|CTK29CD|CTK30|CTK30CD|CTK31|CTK31CD/
const mamonhoc = /([A-Za-z]{2}[0-9]{2})/
const testcc = /CTK([0-9]{2}[A-Z]{2})/

console.log(testcc.test('CTK23LL'))
