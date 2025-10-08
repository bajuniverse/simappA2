import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useProgramsHook } from "../../hooks/programHook";
import { useMentorsHook } from "../../hooks/mentorHook";

const ProgramMentors = ({ program_id, mentors }) => {
    const { user } = useAuth();
    const {
        enrollAsMentor,
        leaveProgram,
        addProgramToMentor,
        removeProgramFromMentor,
    } = useProgramsHook();
    const { mentorsQuery } = useMentorsHook();
    const [selectedMentor, setSelectedMentor] = useState("");

    // Mentor self actions
    if (user?.role === "Mentor") {
        return (
        <div className="bg-white shadow p-4 rounded">
            <div className="flex gap-2">
            <button
                onClick={() => enrollAsMentor.mutate(program_id)}
                className="px-6 py-2 bg-blue-500 text-white rounded"
            >
                Apply as Mentor
            </button>
            <button
                onClick={() => leaveProgram.mutate(program_id)}
                className="px-6 py-2 bg-red-500 text-white rounded"
            >
                Leave Program
            </button>
            </div>
        </div>
        );
    }

    // Admin actions
    if (user?.role === "Admin") {
        return (
        <div className="bg-white shadow p-4 rounded">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Assigned Mentors</h3>
            </div>
            <div className="flex gap-2 mb-3">
                <select
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">Select Mentor</option>
                    {mentorsQuery?.data?.map((m, idx) => (
                        <option key={m.id || idx} value={m.id || idx}>
                            {m.firstName} {m.lastName}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() =>
                        addProgramToMentor.mutate({ mentorId: selectedMentor, program_id })
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Add
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Mentor</th>
                            <th className="px-4 py-2 text-left">Expertise</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {mentors?.length ? (
                            mentors.map((m) => (
                                 <tr key={m._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{m.firstName} {m.lastName}</td>
                                    <td className="px-4 py-2">
                                        {m.expertise}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() =>
                                                removeProgramFromMentor.mutate({ mentorId: m._id, program_id })
                                            }
                                            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                                            >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <td colSpan="3" className="text-center py-4 text-gray-500">
                                No mentors found.
                            </td>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }

    return null;
};

export default ProgramMentors;
