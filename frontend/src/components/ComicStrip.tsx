import { useState } from 'react';
import { ComicPanel } from './ComicPanel';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Download, Share2, RotateCcw, Sparkles, Palette, Wand2 } from 'lucide-react';

interface ComicPanelData {
  id: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  isGenerating: boolean;
  alternativeImages?: string[];
}

interface ComicStripProps {
  panels: ComicPanelData[];
  globalStylePrompt: string;
  onRegenerate: (panelId: string) => void;
  onSelectAlternative: (panelId: string, imageUrl: string) => void;
  onUpdatePrompt: (panelId: string, newPrompt: string) => void;
  onApplyGlobalStyle: (stylePrompt: string) => void;
  onStartOver: () => void;
}

export function ComicStrip({ 
  panels, 
  globalStylePrompt,
  onRegenerate, 
  onSelectAlternative, 
  onUpdatePrompt,
  onApplyGlobalStyle,
  onStartOver 
}: ComicStripProps) {
  const [styleInput, setStyleInput] = useState(globalStylePrompt);

  const handleDownload = () => {
    // TODO: Implement comic strip download functionality
    console.log('Download comic strip');
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Share comic strip');
  };

  const handleApplyStyle = () => {
    if (styleInput.trim()) {
      onApplyGlobalStyle(styleInput);
      setShowStyleEditor(false);
    }
  };

  const completedPanels = panels.filter(p => !p.isGenerating).length;
  const totalPanels = panels.length;
  const isComplete = completedPanels === totalPanels;

  // Suggested style presets
  const stylePresets = [
    { label: '수채화 스타일', value: 'watercolor painting style, soft colors, artistic, dreamy atmosphere' },
    { label: '애니메이션 스타일', value: 'anime style, vibrant colors, clean lines, manga artwork' },
    { label: '빈티지 필름', value: 'vintage film photography, warm tones, nostalgic atmosphere, film grain' },
    { label: '미니멀 일러스트', value: 'minimalist illustration, simple shapes, pastel colors, clean design' },
    { label: '다크 무드', value: 'dark moody atmosphere, cinematic lighting, dramatic shadows, noir style' },
  ];

  return (
    <div className="w-full max-w-7xl space-y-6">
      {/* Header Card */}
      <Card className="border-2 border-pink-200 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-lg flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                나의 일기 만화
                <span className="text-sm font-normal text-muted-foreground">
                  ({totalPanels}컷)
                </span>
              </CardTitle>
              {!isComplete && (
                <p className="text-sm text-muted-foreground">
                  생성 진행 중: {completedPanels}/{totalPanels} 완료
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={onStartOver} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                다시 시작
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                disabled={!isComplete}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                공유하기
              </Button>
              <Button 
                size="sm" 
                onClick={handleDownload}
                disabled={!isComplete}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                다운로드
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {/* Progress Indicator */}
        {!isComplete && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>진행률</span>
                <span>{Math.round((completedPanels / totalPanels) * 100)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
                  style={{ width: `${(completedPanels / totalPanels) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Global Style Editor - Always Visible */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-orange-50/30 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5 text-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            전체 이미지 스타일 조정
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            모든 컷에 적용될 그림체, 색감, 분위기를 설정하세요
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Style Presets */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">빠른 스타일 선택</label>
            <div className="flex flex-wrap gap-2">
              {stylePresets.map((preset, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => setStyleInput(preset.value)}
                  className="h-8 text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Style Input */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              커스텀 스타일 프롬프트
            </label>
            <Textarea
              value={styleInput}
              onChange={(e) => setStyleInput(e.target.value)}
              placeholder="예: watercolor painting style, pastel colors, soft lighting, dreamy atmosphere..."
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              💡 팁: 그림체(애니메이션, 수채화 등), 색감(따뜻한, 차가운 등), 분위기(밝은, 어두운 등)를 영어로 입력하세요
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleApplyStyle}
              disabled={!styleInput.trim()}
              className="flex-1 gap-2"
            >
              <Wand2 className="w-4 h-4" />
              스타일 적용하고 모든 이미지 재생성
            </Button>
            <Button
              variant="outline"
              onClick={() => setStyleInput(globalStylePrompt)}
            >
              초기화
            </Button>
          </div>

          {globalStylePrompt && (
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground mb-1">현재 적용된 스타일:</p>
              <p className="text-sm">{globalStylePrompt}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comic Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {panels.map((panel, index) => (
          <ComicPanel
            key={panel.id}
            panelNumber={index + 1}
            text={panel.text}
            imagePrompt={panel.imagePrompt}
            imageUrl={panel.imageUrl}
            isGenerating={panel.isGenerating}
            alternativeImages={panel.alternativeImages}
            onRegenerate={() => onRegenerate(panel.id)}
            onSelectAlternative={(imageUrl) => onSelectAlternative(panel.id, imageUrl)}
            onUpdatePrompt={(newPrompt) => onUpdatePrompt(panel.id, newPrompt)}
          />
        ))}
      </div>

      {/* Completion Message */}
      {isComplete && (
        <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 via-purple-50/50 to-orange-50/30 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-full flex items-center justify-center animate-pulse shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">만화 생성 완료!</h3>
                  <p className="text-sm text-muted-foreground">
                    마음에 들지 않는 이미지는 재생성하거나 프롬프트를 수정해보세요
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleShare} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  공유하기
                </Button>
                <Button onClick={handleDownload} className="gap-2">
                  <Download className="w-4 h-4" />
                  다운로드
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
