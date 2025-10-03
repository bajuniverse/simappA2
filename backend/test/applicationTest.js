const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { ApplicationStatus } = require('../models/ApplicationModel');
const ApplicationRepo = require('../repositories/ApplicationRepo');
const applicationController = require('../controllers/applicationController');
const { expect } = chai;

describe('CreateApplication Function Test', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should create a new application successfully', async () => {
        const programId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId();

        req.body = {
            applicationId: 'APP12345',
            applicationEmail: 'test@example.com',
            applicationPhone: '1234567890',
            program: programId,
            startupName: 'Test Startup',
            description: 'This is a test startup',
            createdBy: userId
        };

        const mockApplication = {
            _id: new mongoose.Types.ObjectId(),
            applicationId: 'app-123456-abcd12',
            ...req.body,
            status: ApplicationStatus.PENDING
        };
        
        sinon.stub(ApplicationRepo, 'create').resolves(mockApplication);

        await applicationController.createApplication(req, res);

        expect(res.status.calledOnceWith(201)).to.be.true;
        expect(res.json.calledOnceWith(mockApplication)).to.be.true;
    });

    it('should return 500 if there is an error during creation', async () => {
        const programId = new mongoose.Types.ObjectId();
        const userId = new mongoose.Types.ObjectId();

        req.body = {
            applicationId: 'APP12345',
            applicationEmail: 'test@example.com',
            applicationPhone: '1234567890',
            program: programId,
            startupName: 'Test Startup',
            description: 'This is a test startup',
            createdBy: userId
        };

        sinon.stub(ApplicationRepo, 'create').rejects(new Error('Database error'));

        const next = sinon.spy();
        await applicationController.createApplication(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(res.json.called).to.be.false;
        expect(res.json.called).to.be.false;
    });

    it('should validate required fields', async () => {
        req.body = { description: 'This is a test startup' };

        sinon.stub(ApplicationRepo, 'create')
        .callsFake(()=> { throw new Error('should not be called');
        });

        const next = sinon.spy();
        await applicationController.createApplication(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(res.json.called).to.be.false;
        expect(res.json.called).to.be.false;
    });
});