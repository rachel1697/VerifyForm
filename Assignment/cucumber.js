let options = [
    '--require ./Step_def/hooks.js',
    '--require ./Step_def/*Steps.js',
    '--format html:./reports/report.html'
].join(' ')

let features = [
    './features',
    options
].join(' ')

module.exports = {
    test_runner: features
}