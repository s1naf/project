const { format, createLogger, transports } = require('winston');
require("winston-daily-rotate-file");
require('winston-mongodb');

const { combine, timestamp, label, prettyPrint } = format;

const CATEGORY = "winston custom format";

const fileRotateTransport = new transports.DailyRotateFile({
    filename: 'logs/rotate-%DATE%.log',
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});

const logger = createLogger({
    format: combine(
        label({ label: CATEGORY }),
        timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        // prettyPrint()
        format.json()
    ),
    transports: [
        fileRotateTransport,
        new transports.File({
            level: 'error',

            filename: 'logs/error.log'
        }),
        new transports.File({
            level: 'info',
            filename: 'logs/info.log'
        }),
        new transports.Console(),
        new transports.MongoDB({
            level: 'error',
            db: process.env.MONGODB_URI,
            collection: 'logs',
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
});

module.exports = logger;