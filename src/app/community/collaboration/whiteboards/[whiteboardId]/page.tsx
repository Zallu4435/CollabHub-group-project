import Whiteboard from "../../../_components/collaboration/Whiteboard"; 

export default function WhiteboardPage({ params }: { params: { whiteboardId: string } }) {
  return (
    <div className="h-screen bg-gray-50">
      <Whiteboard whiteboardId={params.whiteboardId} />
    </div>
  );
}
