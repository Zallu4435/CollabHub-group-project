"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';
import SimplePeer from 'simple-peer';

interface VoiceChatProps {
  roomId: string;
  userName: string;
  onUsersChange?: (users: Array<{ name: string; color: string }>) => void;
}

interface PeerConnection {
  peer: SimplePeer.Instance;
  userId: string;
  userName: string;
  isMuted: boolean;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({ 
  roomId, 
  userName, 
  onUsersChange 
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [peers, setPeers] = useState<Map<string, PeerConnection>>(new Map());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const peerConnectionsRef = useRef<Map<string, PeerConnection>>(new Map());
  const signalingChannelRef = useRef<BroadcastChannel | null>(null);
  const userIdRef = useRef<string>(`user_${Math.random().toString(36).substr(2, 9)}`);

  // Initialize voice chat
  useEffect(() => {
    initializeVoiceChat();
    return () => {
      cleanup();
    };
  }, [roomId]);

  const initializeVoiceChat = async () => {
    try {
      // Create signaling channel for peer discovery
      const channelName = `voice-chat-${roomId}`;
      signalingChannelRef.current = new BroadcastChannel(channelName);
      
      // Set up signaling channel listeners
    signalingChannelRef.current.onmessage = (event: MessageEvent) => {
        const { type, data, fromUserId } = event.data as {
          type: string;
          data: any;
          fromUserId?: string;
        };
        
        if (fromUserId === userIdRef.current) return; // Ignore own messages
        if (!fromUserId) return; // Ensure we have a sender id

        switch (type) {
          case 'offer':
            handleOffer(data, fromUserId);
            break;
          case 'answer':
            handleAnswer(data, fromUserId);
            break;
          case 'ice-candidate':
            handleIceCandidate(data, fromUserId);
            break;
          case 'user-joined':
            handleUserJoined(fromUserId, data.userName);
            break;
          case 'user-left':
            handleUserLeft(fromUserId);
            break;
        }
      };

      // Announce user joining
      signalingChannelRef.current.postMessage({
        type: 'user-joined',
        fromUserId: userIdRef.current,
        data: { userName }
      });

      setConnectionStatus('Ready to connect');
    } catch (error) {
      console.error('Failed to initialize voice chat:', error);
      setConnectionStatus('Failed to initialize');
    }
  };

  const startVoiceChat = async () => {
    try {
      setConnectionStatus('Connecting...');
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      setLocalStream(stream);
      
      // Set up local audio
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
        localAudioRef.current.muted = true; // Mute local audio to prevent feedback
      }

      setIsConnected(true);
      setConnectionStatus('Connected');
      
      // Notify other users that we're now available for voice chat
      signalingChannelRef.current?.postMessage({
        type: 'voice-ready',
        fromUserId: userIdRef.current,
        data: { userName }
      });

    } catch (error) {
      console.error('Failed to start voice chat:', error);
      setConnectionStatus('Failed to connect');
      alert('Failed to access microphone. Please check permissions.');
    }
  };

  const stopVoiceChat = () => {
    // Stop local stream
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    // Close all peer connections
    peerConnectionsRef.current.forEach(({ peer }) => {
      peer.destroy();
    });
    peerConnectionsRef.current.clear();
    setPeers(new Map());

    setIsConnected(false);
    setConnectionStatus('Disconnected');

    // Notify other users
    signalingChannelRef.current?.postMessage({
      type: 'voice-disconnected',
      fromUserId: userIdRef.current,
      data: { userName }
    });
  };

  const handleUserJoined = (fromUserId: string, userName: string) => {
    if (isConnected && !peerConnectionsRef.current.has(fromUserId)) {
      createPeerConnection(fromUserId, userName, true);
    }
  };

  const handleUserLeft = (fromUserId: string) => {
    const connection = peerConnectionsRef.current.get(fromUserId);
    if (connection) {
      connection.peer.destroy();
      peerConnectionsRef.current.delete(fromUserId);
      setPeers(new Map(peerConnectionsRef.current));
    }
  };

  const createPeerConnection = (userId: string, userName: string, isInitiator: boolean) => {
    const peer = new SimplePeer({
      initiator: isInitiator,
      trickle: false,
      stream: localStream || undefined,
    });

    const connection: PeerConnection = {
      peer,
      userId,
      userName,
      isMuted: false,
    };

    peerConnectionsRef.current.set(userId, connection);
    setPeers(new Map(peerConnectionsRef.current));

    peer.on('signal', (data: SimplePeer.SignalData) => {
      signalingChannelRef.current?.postMessage({
        type: isInitiator ? 'offer' : 'answer',
        fromUserId: userIdRef.current,
        toUserId: userId,
        data
      });
    });

    peer.on('stream', (stream: MediaStream) => {
      // Create audio element for remote stream
      const audio = document.createElement('audio');
      audio.srcObject = stream;
      audio.autoplay = true;
      audio.muted = isDeafened;
      document.body.appendChild(audio);
      
      // Store reference for muting control
      (connection as any).audioElement = audio;
    });

    peer.on('error', (error: Error) => {
      console.error('Peer connection error:', error);
    });

    peer.on('close', () => {
      const connection = peerConnectionsRef.current.get(userId);
      if (connection && (connection as any).audioElement) {
        document.body.removeChild((connection as any).audioElement);
      }
      peerConnectionsRef.current.delete(userId);
      setPeers(new Map(peerConnectionsRef.current));
    });
  };

  const handleOffer = (data: any, fromUserId: string) => {
    if (isConnected && !peerConnectionsRef.current.has(fromUserId)) {
      createPeerConnection(fromUserId, 'Unknown User', false);
      const connection = peerConnectionsRef.current.get(fromUserId);
      if (connection) {
        connection.peer.signal(data);
      }
    }
  };

  const handleAnswer = (data: any, fromUserId: string) => {
    const connection = peerConnectionsRef.current.get(fromUserId);
    if (connection) {
      connection.peer.signal(data);
    }
  };

  const handleIceCandidate = (data: any, fromUserId: string) => {
    const connection = peerConnectionsRef.current.get(fromUserId);
    if (connection) {
      connection.peer.signal(data);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleDeafen = () => {
    setIsDeafened(!isDeafened);
    
    // Mute/unmute all remote audio streams
    peerConnectionsRef.current.forEach((connection) => {
      if ((connection as any).audioElement) {
        (connection as any).audioElement.muted = !isDeafened;
      }
    });
  };

  const cleanup = () => {
    stopVoiceChat();
    if (signalingChannelRef.current) {
      signalingChannelRef.current.close();
    }
  };

  // Update users list for parent component - only when peers change
  const lastSerializedPeersRef = useRef<string>('');
  useEffect(() => {
    const users = Array.from(peers.values()).map(peer => ({
      name: peer.userName,
      color: '#4ECDC4'
    }));
    const serialized = JSON.stringify(users);
    if (serialized !== lastSerializedPeersRef.current) {
      lastSerializedPeersRef.current = serialized;
      onUsersChange?.(users);
    }
  }, [peers]);

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <h3 className="text-sm font-medium text-gray-700">Voice Chat</h3>
        </div>
        <span className="text-xs text-gray-500">{connectionStatus}</span>
      </div>

      {/* Voice Controls */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        {!isConnected ? (
          <button
            onClick={startVoiceChat}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm">Join Voice</span>
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isMuted 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
            
            <button
              onClick={toggleDeafen}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                isDeafened 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isDeafened ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="text-sm">{isDeafened ? 'Undeafen' : 'Deafen'}</span>
            </button>
            
            <button
              onClick={stopVoiceChat}
              className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
              <span className="text-sm">Leave</span>
            </button>
          </>
        )}
      </div>

      {/* Connected Users */}
      {peers.size > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-xs font-medium text-gray-600 mb-2">Connected Users ({peers.size})</h4>
          <div className="space-y-1">
            {Array.from(peers.values()).map((peer) => (
              <div key={peer.userId} className="flex items-center space-x-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{peer.userName}</span>
                {peer.isMuted && <span className="text-red-500">(muted)</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden audio element for local stream */}
      <audio ref={localAudioRef} autoPlay muted />
    </div>
  );
};
