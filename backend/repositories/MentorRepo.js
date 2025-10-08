const MentorModel = require('../models/MentorModel');

class MentorRepo {
    async create(mentorData) {
        return await MentorModel.create(mentorData);
    }

    async findAll() {
        return MentorModel.find().populate('programs');
    }

    async findById(id) {
        return MentorModel.findById(id).populate('programs');
    }
    
    async findByIdWithPassword(id) {
        return MentorModel.findById(id).select('+password').populate('programs');
    }

    async findByProgramId(program_id) {
        return await MentorModel.find({ programs: program_id }).populate('programs');
    }

    async updateById(id, updates) {
        return MentorModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        }).populate('programs');
    }

    async addProgram(id, programId) {
        return MentorModel.findByIdAndUpdate(
            id,
            { $addToSet: { programs: programId } },
            { new: true, runValidators: true }
        ).populate('programs');
    }

    async removeProgram(id, programId) {
        return MentorModel.findByIdAndUpdate(
            id,
            { $pull: { programs: programId } },
            { new: true }
        ).populate('programs');
    }

}

module.exports = new MentorRepo();
