import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeLanding from './pages/home-landing';
import SparkWorkspace from './pages/spark-workspace';
import ProgressTracking from './pages/progress-tracking';
import MissionDashboard from './pages/mission-dashboard';
import MissionBriefing from './pages/mission-briefing';
import InnovationReport from './pages/innovation-report';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeLanding />} />
        <Route path="/home-landing" element={<HomeLanding />} />
        <Route path="/spark-workspace" element={<SparkWorkspace />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/mission-dashboard" element={<MissionDashboard />} />
        <Route path="/mission-briefing" element={<MissionBriefing />} />
        <Route path="/innovation-report" element={<InnovationReport />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;