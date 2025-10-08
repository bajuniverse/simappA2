const mongoose = require('mongoose');
const MentorRepo = require('../repositories/MentorRepo');
const UserRepo = require('../repositories/UserRepo');
const { UserRole } = require('../models/UserModel');
const MentorFactory = require('../domain/factory/MentorFactory');

class MentorController {

    async create(req, res, next) {
        try {
            const mentorData = { ...req.body, role: UserRole.MENTOR };
            const saved = await MentorRepo.create(mentorData);
            const domainMentor = MentorFactory.createMentor(saved.toObject());
            res.status(201).json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const mentors = await MentorRepo.findAll();
            const domainMentors = MentorFactory.createMentors(mentors);
            res.json(domainMentors);
        } catch (error) {
            next(error);
        }
    } 

    async getAllMentorsByProgramId(req, res, next) {
        try {
            const { program_id } = req.params;

            if (!program_id) return res.status(400).json({ message: "Program ID is required"});

            const mentors = await MentorRepo.findByProgramId(program_id);
            if (!mentors || mentors.lengt === 0) {
                return res.status(404).json({ message: "No mentors found for this program"});
            }
            const domainMentors = mentors.map((m) => m.toObject());
            res.json(domainMentors);
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req, res, next) {
        try {
            if (!req.user) return res.status(401).json({ message: 'Not authorized' });
            if (req.user.role !== UserRole.MENTOR) {
                return res.status(403).json({ message: 'Access denied: not a Mentor' });
            }

            const mentor = await MentorRepo.findById(req.user._id);
            if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(mentor.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            if (!req.user) return res.status(401).json({ message: 'Not authorized' });
            const targetId = req.params.id || req.user._id;

            let updated = await UserRepo.updateById(targetId, req.body);
            if (updated && updated.role === UserRole.MENTOR) {
                updated = await MentorRepo.updateById(targetId, req.body);
            }

            if (!updated) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(updated.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async updateMentorByAdmin(req, res, next) {
        try {
            const targetId = req.params.id || req.user._id;
            if (req.user.role !== UserRole.ADMIN && req.user._id.toString() !== targetId.toString()) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const updated = await MentorRepo.updateById(targetId, req.body);
            if (!updated) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(updated.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            if (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.MENTOR) {
                return res.status(403).json({ message: "Access denied: insufficient role" });
            }

            const mentor = await MentorRepo.findById(req.params.id);
            if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(mentor.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async addProgram(req, res, next) {
        try {
            const { program_id } = req.body;
            if (!mongoose.Types.ObjectId.isValid(program_id)) {
                return res.status(400).json({ message: 'Invalid program' });
            }

            const updatedMentor = await MentorRepo.addProgram(req.params.id, program_id);
            if (!updatedMentor) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(updatedMentor.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async removeProgram(req, res, next) {
        try {
            const updatedMentor = await MentorRepo.removeProgram(req.params.id, req.body.program_id);
            if (!updatedMentor) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(updatedMentor.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async enrollInProgram(req, res, next) {
        try {
            const { program_id } = req.body;
            if (!mongoose.Types.ObjectId.isValid(program_id)) {
                return res.status(400).json({ message: 'Invalid program ID' });
            }

            const updatedMentor = await MentorRepo.addProgram(req.user._id, program_id);
            if (!updatedMentor) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(updatedMentor.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async leaveProgram(req, res, next) {
        try {
            const { program_id } = req.body;
            if (!mongoose.Types.ObjectId.isValid(program_id)) {
                return res.status(400).json({ message: 'Invalid program ID' });
            }

            const updatedMentor = await MentorRepo.removeProgram(req.user._id, program_id);
            if (!updatedMentor) return res.status(404).json({ message: 'Mentor not found' });

            const domainMentor = MentorFactory.createMentor(updatedMentor.toObject());
            res.json(domainMentor);
        } catch (error) {
            next(error);
        }
    }

    async deleteMentor(req, res, next) {
        try {
            if (req.user.role !== UserRole.ADMIN) {
                return res.status(403).json({ message: 'Admin access only' });
            }

            const mentor = await MentorRepo.findById(req.params.id);
            if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

            await mentor.deleteOne();
            res.json({ id: req.params.id, deleted: true });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MentorController();