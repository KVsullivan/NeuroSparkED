import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressExport = () => {
  const [exportOptions, setExportOptions] = useState({
    format: 'pdf',
    timeRange: 'all',
    includeSkills: true,
    includeMissions: true,
    includeAchievements: true,
    includeStreak: true
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock export data
    const exportData = generateExportData();
    
    if (exportOptions?.format === 'json') {
      downloadJSON(exportData);
    } else {
      generateHTMLReport(exportData);
    }
    
    setIsExporting(false);
  };

  const generateExportData = () => {
    const currentDate = new Date()?.toISOString()?.split('T')?.[0];
    
    return {
      exportDate: currentDate,
      userProfile: {
        totalXP: 2450,
        currentLevel: 8,
        completedMissions: 15,
        currentStreak: 12,
        longestStreak: 18,
        totalStudyHours: 47.5
      },
      skills: exportOptions?.includeSkills ? [
        { name: 'Problem Solving', current: 85, previous: 65 },
        { name: 'Critical Thinking', current: 78, previous: 60 },
        { name: 'Innovation', current: 92, previous: 70 },
        { name: 'Research', current: 88, previous: 75 },
        { name: 'Communication', current: 75, previous: 55 },
        { name: 'Collaboration', current: 82, previous: 68 }
      ] : [],
      missions: exportOptions?.includeMissions ? [
        {
          title: "Urban Sustainability Challenge",
          completedDate: "2025-01-05",
          xpEarned: 250,
          category: "Environmental Science",
          duration: "3.5 hours"
        },
        {
          title: "Digital Wellness Initiative",
          completedDate: "2025-01-03",
          xpEarned: 200,
          category: "Digital Literacy",
          duration: "2.8 hours"
        },
        {
          title: "Community Innovation Lab",
          completedDate: "2024-12-28",
          xpEarned: 300,
          category: "Social Innovation",
          duration: "4.2 hours"
        }
      ] : [],
      achievements: exportOptions?.includeAchievements ? [
        { title: "First Steps", unlockedDate: "2024-12-15", xpReward: 50 },
        { title: "Streak Master", unlockedDate: "2024-12-22", xpReward: 100 },
        { title: "Innovation Pioneer", unlockedDate: "2025-01-02", xpReward: 200 },
        { title: "Knowledge Seeker", unlockedDate: "2024-12-28", xpReward: 150 },
        { title: "Problem Solver", unlockedDate: "2025-01-05", xpReward: 175 }
      ] : []
    };
  };

  const downloadJSON = (data) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neurosparked-progress-${data?.exportDate}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateHTMLReport = (data) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NeuroSparkED Progress Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            line-height: 1.6; 
            color: #1A1D23; 
            background: #FAFBFC;
            padding: 2rem;
        }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #0066FF; }
        .logo { color: #0066FF; font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; }
        .subtitle { color: #6B7280; font-size: 1rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0; }
        .stat-card { text-align: center; padding: 1rem; background: #F3F4F6; border-radius: 8px; }
        .stat-value { font-size: 2rem; font-weight: bold; color: #0066FF; }
        .stat-label { font-size: 0.875rem; color: #6B7280; margin-top: 0.25rem; }
        .section { margin: 2rem 0; }
        .section-title { font-size: 1.25rem; font-weight: 600; color: #1A1D23; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #E5E7EB; }
        .skill-item, .mission-item, .achievement-item { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 0.75rem; 
            margin: 0.5rem 0; 
            background: #F9FAFB; 
            border-radius: 6px; 
        }
        .progress-bar { 
            width: 100px; 
            height: 8px; 
            background: #E5E7EB; 
            border-radius: 4px; 
            overflow: hidden; 
        }
        .progress-fill { 
            height: 100%; 
            background: linear-gradient(90deg, #0066FF, #00FF66); 
            transition: width 0.3s ease; 
        }
        .footer { 
            text-align: center; 
            margin-top: 3rem; 
            padding-top: 2rem; 
            border-top: 1px solid #E5E7EB; 
            color: #6B7280; 
            font-size: 0.875rem; 
        }
        @media print { 
            body { padding: 0; } 
            .container { box-shadow: none; } 
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">⚡ NeuroSparkED</div>
            <div class="subtitle">Learning Progress Report</div>
            <div style="margin-top: 1rem; color: #6B7280; font-size: 0.875rem;">
                Generated on ${new Date(data.exportDate)?.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${data?.userProfile?.totalXP?.toLocaleString()}</div>
                <div class="stat-label">Total XP</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data?.userProfile?.currentLevel}</div>
                <div class="stat-label">Current Level</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data?.userProfile?.completedMissions}</div>
                <div class="stat-label">Missions Completed</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${data?.userProfile?.currentStreak}</div>
                <div class="stat-label">Current Streak</div>
            </div>
        </div>

        ${data?.skills?.length > 0 ? `
        <div class="section">
            <div class="section-title">🎯 Skill Development</div>
            ${data?.skills?.map(skill => `
                <div class="skill-item">
                    <div>
                        <strong>${skill?.name}</strong>
                        <div style="font-size: 0.875rem; color: #6B7280;">
                            Improved from ${skill?.previous}% to ${skill?.current}%
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${skill?.current}%"></div>
                    </div>
                </div>
            `)?.join('')}
        </div>
        ` : ''}

        ${data?.missions?.length > 0 ? `
        <div class="section">
            <div class="section-title">🚀 Completed Missions</div>
            ${data?.missions?.map(mission => `
                <div class="mission-item">
                    <div>
                        <strong>${mission?.title}</strong>
                        <div style="font-size: 0.875rem; color: #6B7280;">
                            ${mission?.category} • ${mission?.duration} • ${new Date(mission.completedDate)?.toLocaleDateString()}
                        </div>
                    </div>
                    <div style="color: #00FF66; font-weight: 600;">+${mission?.xpEarned} XP</div>
                </div>
            `)?.join('')}
        </div>
        ` : ''}

        ${data?.achievements?.length > 0 ? `
        <div class="section">
            <div class="section-title">🏆 Achievements Unlocked</div>
            ${data?.achievements?.map(achievement => `
                <div class="achievement-item">
                    <div>
                        <strong>${achievement?.title}</strong>
                        <div style="font-size: 0.875rem; color: #6B7280;">
                            Unlocked on ${new Date(achievement.unlockedDate)?.toLocaleDateString()}
                        </div>
                    </div>
                    <div style="color: #00FF66; font-weight: 600;">+${achievement?.xpReward} XP</div>
                </div>
            `)?.join('')}
        </div>
        ` : ''}

        <div class="footer">
            <div>This report was generated by NeuroSparkED</div>
            <div>Continue your learning journey at neurosparked.com</div>
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neurosparked-progress-report-${data?.exportDate}.html`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Export Progress</h3>
          <p className="text-sm text-muted-foreground">Download your learning data for portfolio or records</p>
        </div>
        
        <Icon name="Download" size={24} color="var(--color-primary)" />
      </div>
      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Export Format</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setExportOptions(prev => ({ ...prev, format: 'pdf' }))}
              className={`p-4 border-2 rounded-lg transition-all duration-150 ${
                exportOptions?.format === 'pdf' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <Icon name="FileText" size={24} className="mx-auto mb-2" />
              <div className="text-sm font-medium">HTML Report</div>
              <div className="text-xs opacity-75">Professional formatted report</div>
            </button>
            
            <button
              onClick={() => setExportOptions(prev => ({ ...prev, format: 'json' }))}
              className={`p-4 border-2 rounded-lg transition-all duration-150 ${
                exportOptions?.format === 'json' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <Icon name="Code" size={24} className="mx-auto mb-2" />
              <div className="text-sm font-medium">JSON Data</div>
              <div className="text-xs opacity-75">Raw data for analysis</div>
            </button>
          </div>
        </div>

        {/* Time Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Time Range</label>
          <select
            value={exportOptions?.timeRange}
            onChange={(e) => setExportOptions(prev => ({ ...prev, timeRange: e?.target?.value }))}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Time</option>
            <option value="year">This Year</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>

        {/* Include Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Include in Export</label>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={exportOptions?.includeSkills}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeSkills: e?.target?.checked }))}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} color="var(--color-primary)" />
                <span className="text-sm text-foreground">Skill Development Progress</span>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={exportOptions?.includeMissions}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeMissions: e?.target?.checked }))}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <div className="flex items-center space-x-2">
                <Icon name="Compass" size={16} color="var(--color-success)" />
                <span className="text-sm text-foreground">Completed Missions</span>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={exportOptions?.includeAchievements}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeAchievements: e?.target?.checked }))}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} color="var(--color-warning)" />
                <span className="text-sm text-foreground">Achievements & Badges</span>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={exportOptions?.includeStreak}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeStreak: e?.target?.checked }))}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <div className="flex items-center space-x-2">
                <Icon name="Flame" size={16} color="var(--color-accent)" />
                <span className="text-sm text-foreground">Streak & Activity Data</span>
              </div>
            </label>
          </div>
        </div>

        {/* Export Preview */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Export Preview</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>Format: {exportOptions?.format?.toUpperCase()}</div>
            <div>Time Range: {exportOptions?.timeRange === 'all' ? 'All Time' : exportOptions?.timeRange}</div>
            <div>
              Sections: {[
                exportOptions?.includeSkills && 'Skills',
                exportOptions?.includeMissions && 'Missions',
                exportOptions?.includeAchievements && 'Achievements',
                exportOptions?.includeStreak && 'Activity'
              ]?.filter(Boolean)?.join(', ')}
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          variant="default"
          onClick={handleExport}
          disabled={isExporting}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
          iconSize={18}
          fullWidth
          className="py-3"
        >
          {isExporting ? 'Generating Export...' : 'Export Progress Report'}
        </Button>

        {/* Usage Tips */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-foreground mb-1">Export Tips</div>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• HTML reports are perfect for portfolios and presentations</li>
                <li>• JSON exports can be imported into other analysis tools</li>
                <li>• All exports include your current progress snapshot</li>
                <li>• Reports are generated offline and contain no personal data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressExport;