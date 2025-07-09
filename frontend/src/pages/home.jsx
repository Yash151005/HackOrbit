import React from 'react';

const ResultCard = ({ 
  damagedParts = ["Front Bumper", "Hood", "Right Headlight"], 
  costBreakdown = { "Front Bumper": 2500, "Hood": 4500, "Right Headlight": 1200 }, 
  totalCost = 8200 
}) => {
  
  const handleDownloadReport = () => {
    // Non-functional for now as requested
    alert('Download Report feature will be implemented soon!');
  };

  const getSeverityColor = (cost) => {
    if (cost >= 3000) return 'from-red-500 to-red-600';
    if (cost >= 1500) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  const getSeverityBadge = (cost) => {
    if (cost >= 3000) return { text: 'High', color: 'bg-red-500' };
    if (cost >= 1500) return { text: 'Medium', color: 'bg-yellow-500' };
    return { text: 'Low', color: 'bg-green-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Analysis Complete
            </h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
              AI-powered damage assessment results
            </p>
            <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span>Analysis Complete</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                <span>Ready for Review</span>
              </div>
            </div>
          </div>

          {/* Main Results Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300">
            
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Parts Affected</p>
                    <p className="text-3xl font-bold text-white mt-1">{damagedParts.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Severity Level</p>
                    <p className="text-3xl font-bold text-white mt-1">
                      {totalCost >= 6000 ? 'High' : totalCost >= 3000 ? 'Medium' : 'Low'}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    totalCost >= 6000 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    totalCost >= 3000 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm font-medium">Confidence</p>
                    <p className="text-3xl font-bold text-white mt-1">98.7%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Damaged Parts Analysis */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">🔧</span>
                Damaged Parts Analysis
              </h3>
              
              <div className="space-y-4">
                {damagedParts.map((part, index) => {
                  const cost = costBreakdown[part] || 0;
                  const severity = getSeverityBadge(cost);
                  
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${severity.color} animate-pulse`}></div>
                          <div>
                            <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                              {part}
                            </h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className={`px-3 py-1 text-xs font-bold text-white rounded-full ${severity.color}`}>
                                {severity.text} Impact
                              </span>
                              <span className="text-gray-400 text-sm">
                                Estimated repair time: {Math.ceil(cost / 500)} hours
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${getSeverityColor(cost)} bg-clip-text text-transparent`}>
                            ${cost.toLocaleString()}
                          </div>
                          <div className="text-gray-400 text-sm mt-1">
                            Labor + Parts
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress bar for cost visualization */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getSeverityColor(cost)} transition-all duration-1000 ease-out`}
                            style={{ width: `${Math.min((cost / Math.max(...Object.values(costBreakdown))) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Cost Section */}
            <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-cyan-400/30 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    💰 Total Repair Cost
                  </h3>
                  <p className="text-gray-300">
                    Estimated cost including parts, labor, and taxes
                  </p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>Parts: 60%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Labor: 35%</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>Tax: 5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ${totalCost.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-lg mt-2">
                    USD Estimated
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownloadReport}
                className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
              >
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>📄 Download Detailed Report</span>
                </div>
              </button>
              
              <button className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-white/25">
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>🔗 Share Results</span>
                </div>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <span>🤖 AI Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
                <span>⚡ Instant Results</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
                <span>🔒 Secure Processing</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              © 2024 AutoFix AI. Professional Vehicle Damage Assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
