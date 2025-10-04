import SettingsPanel from '../../components/SettingsPanel';
import NotificationSettings from '../../components/NotificationSettings';

export default function SettingsPage() {
  return (
    <div className="space-y-12">
      <SettingsPanel />
      <NotificationSettings />
    </div>
  );
}
