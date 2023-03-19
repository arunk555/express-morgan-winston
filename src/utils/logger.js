const winston = require('winston');
// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels={
    'error':0,
    'warn':1,
    'info':3,
    'http':4,
    'debug':5
}
// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors={
    'error': 'red',
    'warn': 'yellow',
    'info': 'green',
    'http': 'magenta',
    'debug': 'white'
}
winston.addColors(colors);
// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const level=()=>{
    const env = process.env.NODE_ENV || 'development';
    const isdevelopment = env === 'development';
    return isdevelopment?'debug':'warn';
}
// Add the message timestamp with the preferred format
const timestamp_format = winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss:ms'
});
// Tell Winston that the logs must be colored
const colorize_format = winston.format.colorize({
    all: true
});
// Define the format of the message showing the timestamp, the level and the message
const print_format = winston.format.printf((info)=>`${info.timestamp} - ${info.level}:${info.message}`);

// Chose the aspect of your log customizing the log format.
const format= winston.format.combine(timestamp_format, colorize_format, print_format);
// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
        filename:'logs/error.log',
        level:'error'
    }),
 // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
    new winston.transports.File({
        filename: 'logs/all.log'
    })
]

const logger= winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

module.exports = logger;