class Logger {
    constructor(context = "Logger") {
        this.context = context;
    }

    log(message) {
        console.log(`[${this.context}]: ${message}`);
    }
}

module.exports = Logger;
