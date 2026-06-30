import DashboardLayout from "../../layouts/DashboardLayout";

import ProfileCard from "../../components/settings/ProfileCard";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6">
        <ProfileCard />
      </div>
    </DashboardLayout>
  );
}