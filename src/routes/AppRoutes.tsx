import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Login
from "../pages/Login/Login";

import Signup
from "../pages/Login/Signup";

import Dashboard
from "../pages/Dashbaord/Dashboard";

import NewAudit
from "../pages/Audit/NewAudit";

import AuditProgress
from "../pages/Audit/AuditProgress";

import Analysis
from "../pages/Analysis/Analysis";

import MLResults
from "../pages/MLResults/MLResults";

import Roadmap
from "../pages/Roadmap/Roadmap";

import AuditHistory
from "../pages/History/AuditHistory";

import Reports
from "../pages/Reports/Reports";

import Settings
from "../pages/Settings/Settings";


export default function AppRoutes() {

 return (

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Login />}
/>

<Route
path="/login"
element={<Login />}
/>

<Route
path="/signup"
element={<Signup />}
/>

<Route
path="/dashboard"
element={<Dashboard />}
/>

<Route
path="/audit"
element={<NewAudit />}
/>

<Route
path="/audit-progress/:id"
element={<AuditProgress />}
/>

 <Route
 path="/analysis"
 element={<Analysis />}
/>

<Route
 path="/analysis/:id"
 element={<Analysis />}
/>

<Route
 path="/ml-results"
 element={<MLResults />}
/>

<Route
 path="/ml-results/:id"
 element={<MLResults />}
/>

<Route
 path="/roadmap"
 element={<Roadmap />}
/>

<Route
 path="/roadmap/:id"
 element={<Roadmap />}
/>

<Route
 path="/reports"
 element={<Reports />}
/>

<Route
 path="/reports/:id"
 element={<Reports />}
/>

<Route
 path="/settings"
 element={<Settings />}
/>

<Route
 path="/history"
 element={<AuditHistory />}
/>
</Routes>
</BrowserRouter>

 );
}
