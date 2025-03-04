
const Kaiser = require('./Client/client.js');
const client = new Kaiser()
const { default: chalk } = require('chalk');
const config = require('../config.json');
const { eventsHandler } = require('./Handlers/EventHandler');
const fs = require('fs');
const path = require('path');
const adminFolderPath = path.join(__dirname, '../admin');
const dashboardFilePath = path.join(adminFolderPath, 'dashboard.js');
const eventsPath = './events';
const errorsDir = path.join(__dirname, '../errors');
const { checkMissingIntents } = require('./Handlers/requiredIntents');
const { antiCrash } = require('./Handlers/antiCrash');
antiCrash();
require('./Handlers/watchFolders');

function ensureErrorDirectoryExists() {
    if (!fs.existsSync(errorsDir)) {
        fs.mkdirSync(errorsDir);
    }
}
function logErrorToFile(error) {
    ensureErrorDirectoryExists();

    const errorMessage = `${error.name}: ${error.message}\n${error.stack}`;

    const fileName = `${new Date().toISOString().replace(/:/g, '-')}.txt`;
    const filePath = path.join(errorsDir, fileName);

    fs.writeFileSync(filePath, errorMessage, 'utf8');
}


(async () => {
    try {
        await client.login(config.bot.token);
        console.log(chalk.green.bold('SUCCESS: ') + 'Bot logged in successfully!');
        if (fs.existsSync(adminFolderPath) && fs.existsSync(dashboardFilePath)) {
            require(dashboardFilePath);
            console.log(chalk.green(chalk.green.bold('SUCCESS: Admin dashboard loaded successfully!.')));

        }
        require('./Handlers/functionHandler.js');

        await eventsHandler(client, path.join(__dirname, eventsPath));
        checkMissingIntents(client);
    } catch (error) {
        if (error.message === "An invalid token was provided.") {
            console.error(chalk.red.bold('ERROR: ') + 'The token provided for the Discord bot is invalid. Please check your configuration.');
            logErrorToFile(error)
        } else {
            console.error(chalk.red.bold('ERROR: ') + 'Failed to log in:', error);
            logErrorToFile(error)
        }
    }
})();