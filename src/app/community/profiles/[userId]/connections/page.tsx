import ConnectionsList from '../../../_components/profiles/ConnectionsList';
import { connections } from '../../../_data/profiles';

export default function ConnectionsPage({ params }: { params: { userId: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Connections</h1>
        <ConnectionsList title="All Connections" connections={connections} />
      </div>
    </div>
  );
}
