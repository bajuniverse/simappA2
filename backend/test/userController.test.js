const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

// IMPORTANT: import the instance the way it's exported
const { UserController: userController } = require('../controllers/userController');

const UserRepo = require('../repositories/UserRepo');
const MentorRepo = require('../repositories/MentorRepo');
const { UserRole } = require('../models/UserModel');
const UserFactory = require('../domain/factory/UserFactory');

const { expect } = chai;

describe('UserController Tests', () => {
    let req, res;

    beforeEach(() => {
        req = {
        body: {},
        params: {},
        // provide a default user/role since controller uses role strategy
        user: { _id: new mongoose.Types.ObjectId(), role: UserRole.ADMIN }
        };
        res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
        const mockUsers = [
            { _id: new mongoose.Types.ObjectId(), name: 'Alice', email: 'a@test.com', role: UserRole.ADMIN, toObject() { return this; } },
            { _id: new mongoose.Types.ObjectId(), name: 'Bob',   email: 'b@test.com', role: UserRole.STARTUP, toObject() { return this; } }
        ];

        // Controller uses roleStrategy.getUsers(), not UserRepo.findAll()
        sinon.stub(UserFactory, 'createRoleStrategy').returns({
            getUsers: sinon.stub().resolves(mockUsers)
        });

        // Map DB docs -> domain user shape the controller expects
        sinon.stub(UserFactory, 'createUser').callsFake(u => ({
            id: u._id.toString(),
            name: u.name,
            email: u.email,
            role: u.role
        }));

        await userController.getAllUsers(req, res);

        expect(res.json.calledOnce).to.be.true;
        const payload = res.json.firstCall.args[0];
        expect(payload).to.be.an('array').with.length(2);
        expect(payload[0]).to.include.keys('id', 'name', 'email', 'role');
        });
    });

    describe('getProfile', () => {
        it('should return user profile for startup user', async () => {
        req.user = { _id: new mongoose.Types.ObjectId(), role: UserRole.STARTUP };

        const fakeUser = {
            _id: req.user._id,
            name: 'Charlie',
            email: 'c@test.com',
            role: UserRole.STARTUP,
            toObject() { return this; }
        };

        sinon.stub(UserRepo, 'findById').resolves(fakeUser);
        sinon.stub(UserFactory, 'createUser').returns({
            id: fakeUser._id.toString(),
            name: 'Charlie',
            email: 'c@test.com',
            role: UserRole.STARTUP
        });

        await userController.getProfile(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.include({
            id: fakeUser._id.toString(),
            name: 'Charlie'
        });
        });
    });

    describe('getUserById', () => {
        it('should return 403 if user not found or access denied (per role strategy)', async () => {
        req.params.id = new mongoose.Types.ObjectId().toString();

        // Controller looks up through roleStrategy.getUsers() and then finds by id
        sinon.stub(UserFactory, 'createRoleStrategy').returns({
            getUsers: sinon.stub().resolves([]) // no users visible -> not found/denied
        });

        await userController.getUserById(req, res);

        expect(res.status.calledOnceWith(403)).to.be.true;
        expect(res.json.calledOnce).to.be.true;
        expect(res.json.firstCall.args[0]).to.have.property('message', 'Access denied or user not found');
        });
    });
});
