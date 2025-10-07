import { useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import PatientDashboardScreen from "./components/screens/PatientDashboardScreen";
import PopulationAnalyticsScreen from "./components/screens/PopulationAnalyticsScreen";
import PatientManagementScreen from "./components/screens/PatientManagementScreen";

const App = () => {
  const [activeSection, setActiveSection] = useState("patient-dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "patient-dashboard":
        return <PatientDashboardScreen />;
      case "population-analytics":
        return <PopulationAnalyticsScreen />;
      case "patient-management":
        return <PatientManagementScreen />;
      default:
        return <PatientDashboardScreen />;
    }
  };

  return (
    <MainLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderActiveSection()}
    </MainLayout>
  );
};

export default App;
