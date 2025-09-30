import VirtualHangoutRoom from '../../_components/hangouts/VirtualHangoutRoom';
import { participants } from '../../_data/hangouts';
import { redirect } from 'next/navigation';

export default function HangoutRoomPage({ params, searchParams }: { params: { hangoutId: string }, searchParams?: { mode?: string } }) {
  const mode = searchParams?.mode === 'audio' ? 'audio' : 'video';
  return (
    <VirtualHangoutRoom
      roomId={params.hangoutId}
      roomName={mode === 'audio' ? 'Audio Room' : 'Video Room'}
      participants={participants}
      isHost={true}
      mode={mode as 'audio' | 'video'}
    />
  );
}
