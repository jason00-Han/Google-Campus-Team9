import { ComicPanel } from './ComicPanel';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download, Share2, RotateCcw } from 'lucide-react';

interface ComicPanelData {
  id: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  isGenerating: boolean;
}

interface ComicStripProps {
  panels: ComicPanelData[];
  onRegenerate: (panelId: string) => void;
  onStartOver: () => void;
}

export function ComicStrip({ panels, onRegenerate, onStartOver }: ComicStripProps) {
  const handleDownload = () => {
    // TODO: Implement comic strip download functionality
    console.log('Download comic strip');
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Share comic strip');
  };

  return (
    <div className="w-full max-w-6xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              나의 일기 만화
              <span className="text-sm font-normal text-muted-foreground">
                ({panels.length}컷)
              </span>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onStartOver}>
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 시작
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </Button>
              <Button size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                다운로드
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {panels.map((panel, index) => (
              <ComicPanel
                key={panel.id}
                panelNumber={index + 1}
                text={panel.text}
                imagePrompt={panel.imagePrompt}
                imageUrl={panel.imageUrl}
                isGenerating={panel.isGenerating}
                onRegenerate={() => onRegenerate(panel.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {panels.some(p => p.isGenerating) && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">
                만화 생성 중... ({panels.filter(p => !p.isGenerating).length}/{panels.length} 완료)
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}