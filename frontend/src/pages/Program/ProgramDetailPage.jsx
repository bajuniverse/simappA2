// pages/Program/ProgramDetailPage.jsx
import { useParams } from "react-router-dom";
import { useProgramsHook } from "../../hooks/programHook";
import ProgramInfo from "../../components/Program/ProgramInfo";
import ProgramApplications from "../../components/Program/ProgramApplications";
import ProgramMentors from "../../components/Program/ProgramMentors";
import { useMentorsHook } from "../../hooks/mentorHook";


const ProgramDetailPage = () => {
    const { id } = useParams();
    const { useProgram } = useProgramsHook();
    const { mentorsQuery } = useMentorsHook();

    const { data: program, isLoading, isError } = useProgram(id);

    if (isLoading) return <p className="p-6">Loading program...</p>;
    if (isError || !program) return <p className="p-6 text-red-500">Program not found.</p>;

    return (
        <div className="p-6 space-y-6">

        {/* Program Details */}
        <ProgramInfo program={program} />

        {/* Mentors for this program */}
        <ProgramMentors program_id={id} mentors={program.mentors || []} />

        <p>
            {program.ProgramMentors}
        </p>
            

        {/* Applications under this program */}
        <ProgramApplications program_id={id} />
        </div>
    );
};

export default ProgramDetailPage;
