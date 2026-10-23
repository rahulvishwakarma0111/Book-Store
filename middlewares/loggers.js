const fs = require('fs');


exports.loggerMiddleware = (req, res, next) => {

    const now = new Date();
    const log = `[${now.toISOString()}] ${req.method} ${req.url}\n`;
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.error('Failed to write to log file');
        }
    });
    next();
}