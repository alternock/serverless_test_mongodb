let log = console.log;

const output = content => ({
    statusCode: 200,
    body: JSON.stringify(content)
});


module.exports = {
    log,
    output
}