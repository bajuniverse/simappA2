class ApplicationDecorator {
    constructor(application) {
        if (!application) {
        throw new Error("Application instance is required for decoration");
        }
        this.application = application;
    }

    getData() {
        return this.application;
    }
}

class FeedbackDecorator extends ApplicationDecorator {
    addFeedback(feedback) {
        if (!this.application.feedbacks) {
            this.application.feedbacks = [];
        }

        this.application.feedbacks.push({
            mentorId: feedback.mentorId,
            comment: feedback.comment,
            rating: feedback.rating,
            date: new Date()
        });
        return this.application;
    }
}

class AuditDecorator extends ApplicationDecorator {
    addAuditLog(action, userId) {
        if (!this.application.auditLogs) {
            this.application.auditLogs = [];
        }
        this.application.auditLogs.push({
            action,
            userId,
            date: new Date()
        });
        return this.application;
    }
}

module.exports = { ApplicationDecorator, FeedbackDecorator, AuditDecorator };
