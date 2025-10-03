const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const ApplicationController = require("../controllers/applicationController");
const ApplicationRepo = require("../repositories/ApplicationRepo");

describe("ApplicationController with Decorators", () => {
  let req, res, next, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

    req = {
      params: { id: new mongoose.Types.ObjectId().toString() },
      user: { _id: new mongoose.Types.ObjectId(), role: "MENTOR" },
      body: {}
    };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };

    next = sinon.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("addFeedback", () => {
    it("should add feedback to an application", async () => {
      const mockApp = {
        _id: req.params.id,
        feedbacks: [],
        save: sandbox.stub().resolvesThis()
      };

      sandbox.stub(ApplicationRepo, "findById").resolves(mockApp);

      req.body = { comment: "Excellent work", rating: 5 };

      await ApplicationController.addFeedback(req, res, next);

      expect(mockApp.feedbacks).to.have.lengthOf(1);
      expect(mockApp.feedbacks[0].comment).to.equal("Excellent work");
      expect(res.json.calledOnce).to.be.true;
    });

    it("should return 404 if application not found", async () => {
      sandbox.stub(ApplicationRepo, "findById").resolves(null);

      await ApplicationController.addFeedback(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });

  describe("addAudit", () => {
    it("should add an audit log entry", async () => {
      const mockApp = {
        _id: req.params.id,
        auditLogs: [],
        save: sandbox.stub().resolvesThis()
      };

      sandbox.stub(ApplicationRepo, "findById").resolves(mockApp);

      req.user.role = "ADMIN"; // audit is for admins
      req.body = { action: "UPDATED_STATUS" };

      await ApplicationController.addAudit(req, res, next);

      expect(mockApp.auditLogs).to.have.lengthOf(1);
      expect(mockApp.auditLogs[0].action).to.equal("UPDATED_STATUS");
      expect(res.json.calledOnce).to.be.true;
    });

    it("should return 404 if application not found", async () => {
      sandbox.stub(ApplicationRepo, "findById").resolves(null);

      await ApplicationController.addAudit(req, res, next);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledOnce).to.be.true;
    });
  });
});
