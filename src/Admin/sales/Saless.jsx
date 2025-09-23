import React, { useState } from 'react';



const App = () => {
  const [salesTeam, setSalesTeam] = useState(salesTeamData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Inactive':
        return 'bg-gray-200 text-gray-700';
      default:
        return '';
    }
  };

  const filteredSalesTeam = salesTeam.filter(member => {
    const matchesSearch = member.salesName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <h1 className="text-2xl font-semibold text-gray-800">Sales Team Listing</h1>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              className="w-full md:w-40 py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Sales</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SALES NAME</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MERCHANTS ADDED</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SALES</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSalesTeam.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3">
                      <img className="h-10 w-10 rounded-full" src={member.profilePic} alt="" />
                      <span>{member.salesName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.merchantsAdded}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select className="py-1 px-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none">
                      <option>{member.sales}</option>
                      <option>100</option>
                      <option>200</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(member.status)}`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
