import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Check, Users, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BattleLobbyProps {
  roomCode: string;
  onStart: () => void;
  onCancel: () => void;
  isHost: boolean;
}

export const BattleLobby = ({ roomCode, onStart, onCancel, isHost }: BattleLobbyProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    toast({ title: 'Room code copied!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const message = `Join my Quiz Battle on HackHustle! Use code: ${roomCode}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8 bg-gradient-card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Battle Lobby</h2>
            <p className="text-muted-foreground">
              {isHost ? 'Share the code with friends to join' : 'Waiting for host to start...'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Room Code Display */}
            <div className="bg-background/50 rounded-lg p-6 text-center">
              <Label className="text-sm text-muted-foreground mb-2 block">Room Code</Label>
              <div className="text-4xl font-bold tracking-wider mb-4 font-mono">
                {roomCode}
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={copyRoomCode} variant="outline" size="sm">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
                <Button onClick={shareToWhatsApp} variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on WhatsApp
                </Button>
              </div>
            </div>

            {/* Players List (Mock) */}
            <div>
              <Label className="text-sm text-muted-foreground mb-3 block">Players in Lobby</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-3 bg-background/50 rounded-lg p-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    You
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">You</div>
                    <div className="text-xs text-muted-foreground">
                      {isHost ? 'Host' : 'Player'}
                    </div>
                  </div>
                  {isHost && <Badge variant="secondary">Host</Badge>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              {isHost && (
                <Button onClick={onStart} className="flex-1">
                  Start Battle
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const JoinBattleLobby = ({ onJoin, onCancel }: { onJoin: (code: string) => void; onCancel: () => void }) => {
  const [joinCode, setJoinCode] = useState('');
  const { toast } = useToast();

  const handleJoin = () => {
    if (joinCode.length === 6) {
      // TODO: Verify room exists in MySQL
      toast({ title: 'Joining battle...' });
      onJoin(joinCode);
    } else {
      toast({ title: 'Invalid code', description: 'Please enter a 6-character code', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="p-8 bg-gradient-card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Join Battle</h2>
            <p className="text-muted-foreground">
              Enter the room code to join your friend's battle
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="joinCode">Room Code</Label>
              <Input
                id="joinCode"
                placeholder="Enter 6-character code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="text-center text-2xl font-mono tracking-wider"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleJoin} className="flex-1" disabled={joinCode.length !== 6}>
                Join Battle
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
