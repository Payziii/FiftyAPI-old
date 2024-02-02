class ErrorOutput {

    static error(code, description) {
        return { code: 0, item: { error_code: code, message: description }}
    }
}

module.exports = ErrorOutput