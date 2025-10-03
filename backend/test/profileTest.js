const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const UserController = require('../controllers/userController');
const UserRepo = require('../repositories/UserRepo');
const { expect } = chai;
const UserFactory = require ('../domain/factories/UserFactory')

describe('GetProfile Function Test', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return profile for the given user', async () => {
        const userId = new mongoose.Types.ObjectId();
        const mockProfile = {
            _id: userId,
            name: "John Doe",
            email: "john@example.com",
            role: "Startup",
            toObject: function () {return this;}
        };

        // Stub findById to return an object with select()
        const findByIdStub = sinon.stub(UserRepo, 'findById').resolves(mockProfile);

        const factoryStub = sinon.stub(UserFactory, 'createUser').returns({
            id: userId.toString(),
            name: "John Doe",
            email: "john@example.com",
            role: "Startup",
        });

        const req = { user: { _id: userId } };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const next = sinon.spy();

        await UserController.getProfile(req, res, next);

        expect(findByIdStub.calledOnce).to.be.true;
        expect(factoryStub.calledOnce).to.be.true;

        expect(res.json.calledOnceWithMatch({
            id: userId.toString(),
            name: "John Doe",
            email: "john@example.com",
            role: "Startup"
        })).to.be.true;

        expect(res.status.called).to.be.false;
    });

    it('should return 404 if user not found', async () => {
        sinon.stub(UserRepo, 'findById').resolves(null);

        const req = { user: { _id: new mongoose.Types.ObjectId() } };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const next = sinon.spy();

        await UserController.getProfile(req, res, next);

        expect(res.status.calledOnceWith(404)).to.be.true;
        expect(res.json.calledOnceWithMatch({ message: 'User not found' })).to.be.true;
    });

    it('should return 500 on error', async () => {
        sinon.stub(UserRepo, 'findById').rejects(new Error('DB Error'));

        const req = { user: { _id: new mongoose.Types.ObjectId() } };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const next = sinon.spy();

        await UserController.getProfile(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(res.status.called).to.be.false;
        expect(res.json.called).to.be.false;
    });
});

describe('UpdateUserProfile Function Test', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should change role and update user profile', async () => {
        const userId = new mongoose.Types.ObjectId();

        const updatedUser = {
            _id: userId,
            id: userId.toString(),
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Admin",
            university: "New University",
            address: "New Address",
            toObject: function () {return this;}
        };

        sinon.stub(UserRepo, 'updateById').resolves(updatedUser);

        const req = {
            user: { _id: userId },
            body: {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                role: "Admin",
                university: "New University",
                address: "New Address"
            }
        };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        await UserController.updateUserProfile(req, res);

        expect(res.json.calledOnce).to.be.true;
        const payload = res.json.firstCall.args[0];
        expect(payload).to.include({
            id: userId.toString(),
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Admin",
            address: "New Address"
        });
    });

    it('should return 404 if user not found', async () => {
        sinon.stub(UserRepo, 'updateById').resolves(null);

        const req = { user: { _id: new mongoose.Types.ObjectId() } };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        await UserController.updateUserProfile(req, res);

        expect(res.status.calledOnceWith(404)).to.be.true;
        expect(res.json.calledOnceWithMatch({ message: 'User not found' })).to.be.true;
    });

    it('should return 500 on error', async () => {
        sinon.stub(UserRepo, 'updateById').rejects(new Error('DB Error'));

        const req = { user: { _id: new mongoose.Types.ObjectId() } };
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        };

        const next = sinon.spy();

        await UserController.updateUserProfile(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(res.status.called).to.be.false;
        expect(res.json.called).to.be.false;
    });
});
