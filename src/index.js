const app = require('./app');

async function main() {
    await app.listen(app.get('port'));
    console.log('app listens on port', app.get('port'));
}

main();