import ProjectWorkspacePage from '../ProjectWorkspacePage';

interface WorkspacePageProps {
  params: {
    id: string;
  };
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const resolvedParams = await params;
  return <ProjectWorkspacePage projectId={resolvedParams.id} />;
}
