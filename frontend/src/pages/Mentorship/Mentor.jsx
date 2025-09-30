// src/pages/Applications.jsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../services/axiosConfig';
import RequireAdmin from '../../components/RequireAdmin';

const Mentors = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
//   const [statusFilter, setStatusFilter] = useState('All');
  
  // Fetch mentors
    const fetchMentors = useCallback(async () => {
      try {
        setLoading(true);
        const {data} = await axiosInstance.get('/api/user', {
          headers: { Authorization: `Bearer ${user?.token}` },
          params: {role: 'Mentor', _ts: Date.now()},
        });
        setMentors(Array.isArray(data)? data : []);
        setError(null);

        // const filteredMentor = list.filter(
        //     (u) => u?.role === 'Mentor' || u?.user?.role === 'Mentor'
        // );

        // setMentors(filteredMentor);
      } catch (e) {
        console.error('Fetch mentors error:', e.response?.status,e.response?.data || e.message);
        setError(e.response?.data?.message || 'Failed to fetch mentors');
      } finally{
        setLoading(false);        
      }
    }, [user?.token]);

  useEffect(()=>{
    if (user?.token) fetchMentors();
  }, [user?.token, reload, fetchMentors]);


  useEffect(() => {
    const updated = location.state?.updated;
    if(updated?._id){
        setMentors(prev => prev.map(m=> (m._id === updated._id?{...m, ...updated}:m)));
        setReload(r=>r+1);
        navigate('.', {replace:true, state: null});
    }
  }, [location.state?.updated, navigate]);


  //Update
  const handleUpdate = (mentor) => {
    navigate(`/mentor/update/${mentor._id}`, {state: {mentor}});
  }

  //Delete
  const handleDelete = async(id) => {
    const yes = window.confirm ('Delete this mentor? This cannot be undone.');
    if (!yes) return;

    try {
        await axiosInstance.delete(`/api/user/${id}`,{
            headers: {Authorization:  `Bearer ${user?.token}`},
        });

        setMentors(prev => prev.filter(m=> m._id !== id));
    } catch (e) {
        alert(e?.response?.data?.message || 'Delete failed.');
    }
  };
  
//   // Handle view mentor list
//   const handleViewMentor = (id) => {
//     navigate(`/user/${id}`);
//   };
  
// //   // Filter applications by status
// //   const filteredApplications = statusFilter === 'All' 
// //     ? applications 
// //     : applications.filter(app => app.status === statusFilter);
//   // Format date for display
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString();
//   };
  
  if (loading) return <div className="text-center py-10">Loading mentor list...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  
  return (
    <div className="container-fluid mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mentor List</h1>
        {/* <div className="flex items-center">
          {/* <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All Applications</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select> */}
        {/*</div>*/} 
      </div>

        <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-700">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Mentor ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Expertise
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Affiliation
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Address
              </th>
              {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Program Applied
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Program Enrolled
              </th> */}
              {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th> */}
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
      
          <tbody className="divide-y divide-gray-200">
            {mentors.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500">
                  No mentor found
                </td>
              </tr>
            ) : (
              mentors.map((m) => (
                <tr key={m._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {m.code || m._id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {m.firstName || m.name || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {m.lastName || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {m.number || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {m.expertise || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {m.affiliation || '-'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {m.address || '-'}
                  </td>
                  {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.(application.submissionDate)}
                  </td> */}
                  {/* <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      m.status === 'Active' ? 'bg-yellow-100 text-yellow-800' :
                      m.status === 'Inactive' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {m.status || 'Active'}
                    </span> */}
                  {/* </td> */}
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleUpdate(m)}
                      className="mr-3 text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
         </tbody>
        </table>
      </div>
    </div>
    );
};

// Export with authentication protection
export default function ProtectedMentors() {
  return (
    <RequireAdmin>
      <Mentors />
    </RequireAdmin>
  );
}