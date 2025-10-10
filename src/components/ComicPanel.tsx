import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RefreshCw, Download } from 'lucide-react';

interface ComicPanelProps {
  panelNumber: number;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  isGenerating?: boolean;
  onRegenerate?: () => void;
}

export function ComicPanel({
  panelNumber, 
  text, 
  imagePrompt, 
  imageUrl, 
  isGenerating = false,
  onRegenerate 
}: ComicPanelProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="w-full max-w-sm border-2 border-dashed border-border hover:border-primary/50 transition-colors">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">컷 {panelNumber}</Badge>
          {onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
              disabled={isGenerating}
            >
              <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>

        <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
          {isGenerating ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">이미지 생성 중...</p>
              </div>
            </div>
          ) : imageUrl && !imageError ? (
            <ImageWithFallback
              src={imageUrl}
              alt={`Comic panel ${panelNumber}`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center space-y-2 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">이미지 준비 중</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="bg-accent/50 p-3 rounded-lg">
            <p className="text-sm">{text}</p>
          </div>
          
          <details className="text-xs">
            <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
              이미지 프롬프트 보기
            </summary>
            <div className="mt-2 p-2 bg-muted rounded text-muted-foreground">
              {imagePrompt}
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );
}