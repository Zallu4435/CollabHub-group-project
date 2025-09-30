import IdeaBoard from "../../../_components/collaboration/IdeaBoard";

const dummyIdeas = [
  {
    id: '1',
    content: 'Add dark mode support to the platform',
    author: { id: '1', name: 'John Doe', avatar: '/avatars/john.jpg' },
    votes: 15,
    color: '#FFF59D',
    position: { x: 10, y: 15 }
  },
  {
    id: '2',
    content: 'Implement real-time notifications',
    author: { id: '2', name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
    votes: 12,
    color: '#FFCCBC',
    position: { x: 30, y: 20 }
  }
];

export default function IdeaBoardPage({ params }: { params: { ideaBoardId: string } }) {
  return (
    <div className="h-screen bg-gray-50">
      <IdeaBoard boardId={params.ideaBoardId} ideas={dummyIdeas} />
    </div>
  );
}
