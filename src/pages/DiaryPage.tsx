import { useState } from 'react';
import { DiaryInput } from '../components/DiaryInput';
import { ComicStrip } from '../components/ComicStrip';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, Sparkles } from 'lucide-react';

interface ComicPanelData {
  id: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  isGenerating: boolean;
}

export default function App() {
  const [panels, setPanels] = useState<ComicPanelData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock function to split diary into panels and generate prompts
  const processDiary = (diaryText: string): ComicPanelData[] => {
    // Simple sentence splitting for demo
    const sentences = diaryText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const mockPanels: ComicPanelData[] = sentences.slice(0, 6).map((sentence, index) => ({
      id: `panel-${index}`,
      text: sentence.trim(),
      imagePrompt: generateImagePrompt(sentence.trim()),
      isGenerating: true
    }));

    return mockPanels;
  };

  // Mock function to generate image prompts
  const generateImagePrompt = (text: string): string => {
    const prompts = [
      "A cozy morning scene with warm sunlight streaming through a window, coffee cup on a table, peaceful atmosphere, cartoon style",
      "Friends sitting together at a modern cafe, enjoying desserts and conversation, warm lighting, illustration style", 
      "Person walking through a beautiful autumn park with colorful fall leaves, peaceful nature scene, artistic style",
      "Comfortable evening at home, person relaxing and watching TV, cozy interior, soft lighting, cartoon illustration",
      "Bright morning bedroom scene with sunlight, birds visible outside window, fresh and cheerful atmosphere, anime style",
      "Close-up of delicious cake and coffee at a trendy cafe, warm and inviting food photography style"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  // Mock image URLs for demo
  const mockImages = [
    "https://images.unsplash.com/photo-1731661553530-9fa227db04ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2FmZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4MjkxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1526865906320-0200a6e2c7f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2FmZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4MjkxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1643983702094-9913662d8f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBwYXJrJTIwd2Fsa3xlbnwxfHx8fDE3NTgyOTE2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const handleDiarySubmit = async (diaryText: string) => {
    setIsProcessing(true);
    
    // Process diary into panels
    const newPanels = processDiary(diaryText);
    setPanels(newPanels);

    // Simulate API calls for image generation
    for (let i = 0; i < newPanels.length; i++) {
      setTimeout(() => {
        setPanels(currentPanels => 
          currentPanels.map(panel => 
            panel.id === newPanels[i].id 
              ? { 
                  ...panel, 
                  isGenerating: false, 
                  imageUrl: mockImages[i % mockImages.length] 
                } 
              : panel
          )
        );
      }, (i + 1) * 2000); // Stagger the completion
    }

    setIsProcessing(false);
  };

  const handleRegenerate = (panelId: string) => {
    setPanels(currentPanels =>
      currentPanels.map(panel =>
        panel.id === panelId
          ? { ...panel, isGenerating: true }
          : panel
      )
    );

    setTimeout(() => {
      setPanels(currentPanels =>
        currentPanels.map(panel =>
          panel.id === panelId
            ? { 
                ...panel, 
                isGenerating: false,
                imageUrl: mockImages[Math.floor(Math.random() * mockImages.length)]
              }
            : panel
        )
      );
    }, 3000);
  };

  const handleStartOver = () => {
    setPanels([]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">일기 만화 생성기</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            당신의 소중한 일기를 AI가 감성적인 만화로 변환해드립니다. 
            일상의 순간들이 아름다운 스토리로 재탄생됩니다.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          {panels.length === 0 ? (
            <DiaryInput 
              onSubmit={handleDiarySubmit} 
              isLoading={isProcessing}
            />
          ) : (
            <ComicStrip 
              panels={panels}
              onRegenerate={handleRegenerate}
              onStartOver={handleStartOver}
            />
          )}
        </div>

        {/* Info Card */}
        {panels.length === 0 && (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h3>일기 작성</h3>
                  <p className="text-sm text-muted-foreground">
                    오늘 하루 있었던 일을 자유롭게 작성해보세요
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3>AI 분석</h3>
                  <p className="text-sm text-muted-foreground">
                    AI가 일기를 여러 장면으로 나누고 이미지 프롬프트를 생성합니다
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-5 h-5 bg-primary rounded-sm" />
                  </div>
                  <h3>만화 생성</h3>
                  <p className="text-sm text-muted-foreground">
                    각 장면마다 어울리는 만화 스타일의 이미지를 생성합니다
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}