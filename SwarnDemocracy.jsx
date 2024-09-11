import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaVoteYea, FaChartBar, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { AiFillLock } from 'react-icons/ai';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SwarnDemocracy = () => {
  const [activeTab, setActiveTab] = useState('vote');
  const [votingProgress, setVotingProgress] = useState(0);
  const [votingResults, setVotingResults] = useState(null);

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setVotingProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 1000);

    // Simulating voting results
    setTimeout(() => {
      setVotingResults({
        labels: ['Candidate A', 'Candidate B', 'Candidate C'],
        datasets: [
          {
            label: 'Votes',
            data: [300, 250, 200],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
          },
        ],
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'vote':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Cast Your Vote</h2>
            <div className="space-y-4">
              {['Candidate A', 'Candidate B', 'Candidate C'].map((candidate) => (
                <button
                  key={candidate}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                  onClick={() => alert(`Vote cast for ${candidate}`)}
                >
                  Vote for {candidate}
                </button>
              ))}
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Voting Results</h2>
            {votingResults ? (
              <Bar data={votingResults} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            ) : (
              <p>Loading results...</p>
            )}
          </div>
        );
      case 'profile':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2>
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-4xl text-gray-500 mr-4" />
              <div>
                <p className="font-bold">John Doe</p>
                <p className="text-sm text-gray-600">Voter ID: 123456789</p>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Voting History</h3>
            <ul className="list-disc list-inside">
              <li>2023 General Election</li>
              <li>2022 Local Council Election</li>
              <li>2021 Referendum</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SwarnDemocracy</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, John Doe</span>
            <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <FaSignOutAlt className="text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <nav className="md:w-1/4">
            <ul className="space-y-2">
              {[
                { id: 'vote', icon: FaVoteYea, label: 'Cast Vote' },
                { id: 'results', icon: FaChartBar, label: 'Results' },
                { id: 'profile', icon: FaUserCircle, label: 'Profile' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    className={`w-full flex items-center p-3 rounded ${activeTab === item.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:w-3/4">
            {renderContent()}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2023 SwarnDemocracy. All rights reserved.</p>
          <div className="flex items-center">
            <AiFillLock className="mr-2" />
            <span>Secured by Blockchain</span>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 bg-blue-100 p-2">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Voting Progress:</span>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${votingProgress}%` }}
              ></div>
            </div>
            <span>{votingProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwarnDemocracy;