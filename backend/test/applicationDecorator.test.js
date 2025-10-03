const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const { FeedbackDecorator, AuditDecorator } = require("../domain/decorators/ApplicationDecorator");

describe("ApplicationDecorator", () => {
    let mockApplication;

    beforeEach(() => {
        mockApplication = {
        _id: new mongoose.Types.ObjectId(),
        startupName: "Test Startup",
        feedbacks: [],
        auditLogs: [],
        save: sinon.stub().resolvesThis()
        };
    });

    describe("FeedbackDecorator", () => {
        it("should add feedback to an application", () => {
            const decorator = new FeedbackDecorator(mockApplication);
            decorator.addFeedback({
                mentorId: new mongoose.Types.ObjectId(),
                comment: "Great pitch!",
                rating: 5
            });

        expect(mockApplication.feedbacks).to.have.lengthOf(1);
            expect(mockApplication.feedbacks[0]).to.include({
                comment: "Great pitch!",
                rating: 5
            });
        });

        it("should add multiple feedback entries", () => {
            const decorator = new FeedbackDecorator(mockApplication);
            decorator.addFeedback({ mentorId: "1", comment: "First", rating: 4 });
            decorator.addFeedback({ mentorId: "2", comment: "Second", rating: 3 });

            expect(mockApplication.feedbacks).to.have.lengthOf(2);
            expect(mockApplication.feedbacks[1].comment).to.equal("Second");
        });
    });

    describe("AuditDecorator", () => {
        it("should add audit log entry", () => {
            const decorator = new AuditDecorator(mockApplication);
                decorator.addAuditLog("UPDATED_STATUS", new mongoose.Types.ObjectId());

                expect(mockApplication.auditLogs).to.have.lengthOf(1);
                expect(mockApplication.auditLogs[0].action).to.equal("UPDATED_STATUS");
            });

            it("should support multiple audit logs", () => {
                const decorator = new AuditDecorator(mockApplication);
                decorator.addAuditLog("CREATE", "user-1");
                decorator.addAuditLog("DELETE", "user-2");

            expect(mockApplication.auditLogs).to.have.lengthOf(2);
            expect(mockApplication.auditLogs[1].action).to.equal("DELETE");
        });
    });
});
