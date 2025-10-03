class ApplicationDecorator {

constructor(application) {
        this.application = application;
    }

    getData() {
        return this.application;
    }
}

module.exports = ApplicationDecorator;
