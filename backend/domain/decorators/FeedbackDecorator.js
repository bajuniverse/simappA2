const ApplicationDecorator = require("./ApplicationDecorator");

class FeedbackDecorator extends ApplicationDecorator {
    addFeedback(feedback) {
        if (!this.application.feedbacks) {
            this.application.feedbacks = [];
        }
        this.application.feedbacks.push({
            comment: feedback.comment,
            rating: feedback.rating,
            mentorId: feedback.mentorId,
            date: new Date()
        });
        return this.application;
    }
}

module.exports = FeedbackDecorator;
