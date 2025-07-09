import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation, useNavigate } from 'react-router-dom';

// Mock ResultCard component - replace with your actual ResultCard import
const ResultCard = ({ damagedParts, costBreakdown, totalCost, carInfo }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform hover:scale-[1.01] transition-all duration-300">
      {/* Car Info Section */}
      {carInfo && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Vehicle Information
          </h3>
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 border border-blue-400/30">
            <p className="text-white text-lg font-semibold">
              {carInfo.year} {carInfo.name} {carInfo.model}
            </p>
          </div>
        </div>
      )}

      {/* Damaged Parts Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          Damaged Parts Detected
        </h3>
        <div className="grid gap-4">
          {damagedParts?.map((part, index) => (
            <div key={index} className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-4 border border-red-400/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="text-white font-semibold">{part.name}</span>
                </div>
                <span className="text-red-300 text-sm font-medium">
                  {part.severity} Damage
                </span>
              </div>
              {part.description && (
                <p className="text-gray-300 text-sm mt-2 ml-6">{part.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cost Breakdown Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          Cost Breakdown
        </h3>
        <div className="space-y-3">
          {costBreakdown?.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                <span className="text-white">{item.part}</span>
              </div>
              <span className="text-cyan-300 font-semibold">₹{(item.cost * 83).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-cyan-400/30">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">Estimated Total Cost</h3>
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ₹{((totalCost || 0) * 83).toLocaleString()}
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-2">
          *Estimates may vary based on location, parts availability, and labor rates
        </p>
      </div>
    </div>
  );
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data from location state with correct mapping
  const { resultData, carInfo } = location.state || {};
  
  // Map the data to the expected format
  const damagedParts = resultData?.detectedParts?.map(part => ({
    name: part,
    severity: resultData.severity || 'Moderate',
    description: '' // you can customize this if you want
  }));
  
  const costBreakdown = resultData ? 
    Object.entries(resultData.estimatedCosts || {}).map(([part, cost]) => ({
      part,
      cost
    })) : [];
  
  const totalCost = resultData?.totalCost;

  // Handle case where no data is available (direct navigation)
  if (!location.state || !resultData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">No Data Available</h2>
          <p className="text-gray-300 mb-8">Please upload an image first to see the analysis results.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold py-3 px-8 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate('/');
  };

  const handleShareReport = async () => {
    const reportData = {
      vehicle: carInfo ? `${carInfo.year} ${carInfo.name} ${carInfo.model}` : 'Vehicle',
      damagedParts: damagedParts?.map(part => part.name).join(', ') || 'None detected',
      totalCost: totalCost ? `₹${(totalCost * 83).toLocaleString()}` : 'Not calculated',
      timestamp: new Date().toLocaleDateString('en-IN')
    };

    const shareText = `🚗 AutoFix AI Damage Report\n\n` +
      `Vehicle: ${reportData.vehicle}\n` +
      `Damaged Parts: ${reportData.damagedParts}\n` +
      `Estimated Cost: ${reportData.totalCost}\n` +
      `Date: ${reportData.timestamp}\n\n` +
      `Generated by AutoFix AI - Professional Vehicle Damage Assessment`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AutoFix AI Damage Report',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare(shareText);
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Report copied to clipboard! You can now paste it anywhere.');
      }).catch(() => {
        showReportModal(text);
      });
    } else {
      showReportModal(text);
    }
  };

  const showReportModal = (text) => {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.8); display: flex; align-items: center; 
      justify-content: center; z-index: 10000;
    `;
    
    modal.innerHTML = `
      <div style="background: white; padding: 20px; border-radius: 10px; max-width: 500px; margin: 20px;">
        <h3 style="color: #333; margin-bottom: 15px;">Share Your Report</h3>
        <textarea readonly style="width: 100%; height: 200px; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-family: monospace; font-size: 12px;">${text}</textarea>
        <div style="margin-top: 15px; text-align: right;">
          <button onclick="this.parentElement.parentElement.parentElement.remove()" style="background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  };
const handleDownloadReport = async () => {
    const reportId = `AR-${Date.now().toString(36).toUpperCase()}`;
    const currentDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const currentTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>AutoFix AI - Vehicle Damage Assessment Report</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body { 
                font-family: 'Inter', Arial, sans-serif; 
                font-size: 11px;
                line-height: 1.3; 
                color: #1a1a1a;
                background: white;
                padding: 15px;
            }
            
            .report-container {
                max-width: 100%;
                background: white;
            }
            
            .header {
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                color: white;
                padding: 15px;
                text-align: center;
                border-radius: 8px;
                margin-bottom: 15px;
            }
            
            .logo {
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 3px;
            }
            
            .tagline {
                font-size: 10px;
                opacity: 0.9;
                margin-bottom: 8px;
            }
            
            .report-id {
                display: inline-block;
                background: rgba(255,255,255,0.2);
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 9px;
                font-weight: 600;
            }
            
            .content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .left-column, .right-column {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .section {
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 10px;
            }
            
            .section-title {
                font-size: 12px;
                font-weight: 700;
                color: #1e3c72;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 4px;
            }
            
            .section-icon {
                margin-right: 6px;
                font-size: 10px;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 3px 0;
                border-bottom: 1px solid #f1f5f9;
            }
            
            .info-row:last-child {
                border-bottom: none;
            }
            
            .info-label {
                font-size: 9px;
                font-weight: 600;
                color: #64748b;
                flex: 1;
            }
            
            .info-value {
                font-size: 10px;
                font-weight: 600;
                color: #1e293b;
                text-align: right;
                flex: 1;
            }
            
            .damage-item {
                background: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: 4px;
                padding: 6px 8px;
                margin-bottom: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 9px;
            }
            
            .damage-name {
                font-weight: 600;
                color: #dc2626;
            }
            
            .damage-severity {
                background: #dc2626;
                color: white;
                padding: 2px 6px;
                border-radius: 8px;
                font-size: 8px;
                font-weight: 600;
            }
            
            .cost-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 4px 0;
                border-bottom: 1px solid #e2e8f0;
                font-size: 9px;
            }
            
            .cost-item:last-child {
                border-bottom: none;
            }
            
            .cost-name {
                font-weight: 500;
                color: #374151;
            }
            
            .cost-value {
                font-weight: 700;
                color: #059669;
            }
            
            .total-cost {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 12px;
                border-radius: 6px;
                text-align: center;
                grid-column: 1 / -1;
            }
            
            .total-label {
                font-size: 10px;
                opacity: 0.9;
                margin-bottom: 4px;
            }
            
            .total-amount {
                font-size: 20px;
                font-weight: 700;
            }
            
            .footer {
                background: #f1f5f9;
                padding: 12px;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                text-align: center;
                margin-top: 10px;
            }
            
            .disclaimer {
                font-size: 8px;
                color: #64748b;
                line-height: 1.3;
                margin-bottom: 8px;
            }
            
            .credentials {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 6px;
                flex-wrap: wrap;
            }
            
            .credential {
                font-size: 8px;
                color: #475569;
            }
            
            .contact-info {
                font-size: 7px;
                color: #64748b;
                margin-top: 6px;
            }
            
            .compact-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 6px;
            }
            
            .compact-item {
                font-size: 8px;
                padding: 4px;
                background: #f8fafc;
                border-radius: 3px;
                text-align: center;
            }
            
            .compact-label {
                font-weight: 600;
                color: #64748b;
                display: block;
            }
            
            .compact-value {
                font-weight: 600;
                color: #1e293b;
                margin-top: 2px;
            }
        </style>
    </head>
    <body>
        <div class="report-container">
            <div class="header">
                <div class="logo">AutoFix AI</div>
                <div class="tagline">Professional Vehicle Damage Assessment</div>
                <div class="report-id">Report ID: ${reportId}</div>
            </div>
            
            <div class="content">
                <div class="left-column">
                    <div class="section">
                        <h3 class="section-title">
                            <span class="section-icon">📊</span>
                            Report Info
                        </h3>
                        <div class="compact-grid">
                            <div class="compact-item">
                                <span class="compact-label">Date</span>
                                <div class="compact-value">${currentDate}</div>
                            </div>
                            <div class="compact-item">
                                <span class="compact-label">Time</span>
                                <div class="compact-value">${currentTime}</div>
                            </div>
                            <div class="compact-item">
                                <span class="compact-label">Method</span>
                                <div class="compact-value">AI Analysis</div>
                            </div>
                            <div class="compact-item">
                                <span class="compact-label">Status</span>
                                <div class="compact-value">Complete</div>
                            </div>
                        </div>
                    </div>

                    ${carInfo ? `
                    <div class="section">
                        <h3 class="section-title">
                            <span class="section-icon">🚗</span>
                            Vehicle Info
                        </h3>
                        <div class="info-row">
                            <span class="info-label">Vehicle</span>
                            <span class="info-value">${carInfo.year} ${carInfo.name} ${carInfo.model}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Assessment</span>
                            <span class="info-value">External Damage</span>
                        </div>
                    </div>
                    ` : ''}

                    <div class="section">
                        <h3 class="section-title">
                            <span class="section-icon">⚠️</span>
                            Damage Detected
                        </h3>
                        ${damagedParts && damagedParts.length > 0 ? 
                            damagedParts.slice(0, 4).map(part => `
                                <div class="damage-item">
                                    <span class="damage-name">${part.name}</span>
                                    <span class="damage-severity">${part.severity}</span>
                                </div>
                            `).join('') : 
                            '<div class="damage-item"><span class="damage-name">No damage detected</span></div>'
                        }
                        ${damagedParts && damagedParts.length > 4 ? 
                            `<div style="font-size: 8px; text-align: center; color: #64748b; margin-top: 4px;">+${damagedParts.length - 4} more items</div>` : ''}
                    </div>
                </div>

                <div class="right-column">
                    <div class="section">
                        <h3 class="section-title">
                            <span class="section-icon">💰</span>
                            Cost Breakdown
                        </h3>
                        ${costBreakdown && costBreakdown.length > 0 ? 
                            costBreakdown.slice(0, 6).map(item => `
                                <div class="cost-item">
                                    <span class="cost-name">${item.part}</span>
                                    <span class="cost-value">₹${(item.cost * 83).toLocaleString()}</span>
                                </div>
                            `).join('') : 
                            '<div class="cost-item"><span class="cost-name">No costs calculated</span></div>'
                        }
                        ${costBreakdown && costBreakdown.length > 6 ? 
                            `<div style="font-size: 8px; text-align: center; color: #64748b; margin-top: 4px;">+${costBreakdown.length - 6} more items</div>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="total-cost">
                <div class="total-label">Estimated Total Repair Cost</div>
                <div class="total-amount">₹${((totalCost || 0) * 83).toLocaleString()}</div>
            </div>
            
            <div class="footer">
                <div class="credentials">
                    <span class="credential">✓ AI-Certified</span>
                    <span class="credential">🔒 Secure</span>
                    <span class="credential">📈 Industry Standard</span>
                </div>
                
                <div class="disclaimer">
                    <strong>DISCLAIMER:</strong> AI-generated estimate. Actual costs may vary based on location, labor rates, and hidden damages. Consult certified professionals for final decisions.
                </div>
                
                <div class="contact-info">
                    AutoFix AI | Report: ${reportId} | Generated: ${currentDate} ${currentTime}
                </div>
            </div>
        </div>
    </body>
    </html>`;

    // Create PDF with optimized settings for single page
    const pdf = new jsPDF('p', 'mm', 'a4');
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    element.style.width = '210mm';
    element.style.height = 'auto';
    element.style.overflow = 'hidden';
    document.body.appendChild(element);

    try {
        const canvas = await html2canvas(element, {
            scale: 1.5, // Reduced scale for better fit
            useCORS: true,
            allowTaint: true,
            height: element.scrollHeight,
            windowHeight: element.scrollHeight
        });

        document.body.removeChild(element);

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // A4 width minus margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // If content is too tall, scale it down to fit
        if (imgHeight > 277) { // A4 height minus margins
            const scaleFactor = 277 / imgHeight;
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth * scaleFactor, 277);
        } else {
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        }

        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `AutoFix-AI-Report-${reportId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('PDF generation error:', error);
        alert('Error generating PDF. Please try again.');
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AutoFix AI
            </h1>
            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-white hover:text-cyan-300 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Damage Report
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AI analysis complete! Here's your detailed damage assessment and repair cost breakdown.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-6 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span>✅ Analysis Complete</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span>🔍 Parts Identified</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
              <span>💰 Costs Calculated</span>
            </div>
          </div>
        </div>

        {/* Result Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <ResultCard 
            damagedParts={damagedParts}
            costBreakdown={costBreakdown}
            totalCost={totalCost}
            carInfo={carInfo}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-cyan-400/50 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Analyze Another Image</span>
          </button>
          
          <button 
            onClick={handleDownloadReport}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-400/50 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Report</span>
          </button>

          <button 
            onClick={handleShareReport}
            className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-white/10 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-white/20 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>Share Report</span>
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span>🤖 AI Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
              <span>📊 Detailed Report</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse"></div>
              <span>💰 Cost Estimate</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            © 2024 AutoFix AI. Professional Vehicle Damage Assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;