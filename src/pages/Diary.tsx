import { useState } from 'react';
import { Auth } from '../components/Auth';
import { DiaryInput } from '../components/DiaryInput';
import { ComicStrip } from '../components/ComicStrip';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, Sparkles, LogOut, User } from 'lucide-react';

interface ComicPanelData {
  id: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  isGenerating: boolean;
  alternativeImages?: string[];
}

interface DiaryPageProps{
    currentUser: string;
    onLogout: () => void;
}

export default function DiaryPage({ currentUser, onLogout }: DiaryPageProps) {
  const [panels, setPanels] = useState<ComicPanelData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalStylePrompt, setGlobalStylePrompt] = useState('');

  const handleLogout = () => {
    onLogout();
    setPanels([]);
    setGlobalStylePrompt('');
  };

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

  // Mock image URLs for demo - expanded set for alternatives
  const mockImageSets = [
    {
      main: "https://images.unsplash.com/photo-1731661553530-9fa227db04ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2FmZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4MjkxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      alternatives: [
        "https://images.unsplash.com/photo-1526865906320-0200a6e2c7f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2FmZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4MjkxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc1ODI5MTY1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwZGVzc2VydHxlbnwxfHx8fDE3NTgyOTE2NTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    {
      main: "https://images.unsplash.com/photo-1643983702094-9913662d8f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBwYXJrJTIwd2Fsa3xlbnwxfHx8fDE3NTgyOTE2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alternatives: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwd2Fsa3xlbnwxfHx8fDE3NTgyOTE2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBwYXJrfGVufDF8fHx8MTc1ODI5MTY1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBmb3Jlc3R8ZW58MXx8fHwxNzU4MjkxNjU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    {
      main: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG9tZXxlbnwxfHx8fDE3NTgyOTE2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alternatives: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU4MjkxNjU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxheGluZyUyMGhvbWV8ZW58MXx8fHwxNzU4MjkxNjU2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTgyOTE2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    }
  ];

  const handleDiarySubmit = async (diaryText: string) => {
    setIsProcessing(true);
    
    // Process diary into panels
    const newPanels = processDiary(diaryText);
    setPanels(newPanels);

    // Simulate API calls for image generation
    for (let i = 0; i < newPanels.length; i++) {
      setTimeout(() => {
        const imageSet = mockImageSets[i % mockImageSets.length];
        setPanels(currentPanels => 
          currentPanels.map(panel => 
            panel.id === newPanels[i].id 
              ? { 
                  ...panel, 
                  isGenerating: false, 
                  imageUrl: imageSet.main,
                  alternativeImages: imageSet.alternatives
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
      const imageSet = mockImageSets[Math.floor(Math.random() * mockImageSets.length)];
      setPanels(currentPanels =>
        currentPanels.map(panel =>
          panel.id === panelId
            ? { 
                ...panel, 
                isGenerating: false,
                imageUrl: imageSet.main,
                alternativeImages: imageSet.alternatives
              }
            : panel
        )
      );
    }, 3000);
  };

  const handleSelectAlternative = (panelId: string, imageUrl: string) => {
    setPanels(currentPanels =>
      currentPanels.map(panel =>
        panel.id === panelId
          ? { ...panel, imageUrl }
          : panel
      )
    );
  };

  const handleUpdatePrompt = (panelId: string, newPrompt: string) => {
    setPanels(currentPanels =>
      currentPanels.map(panel =>
        panel.id === panelId
          ? { ...panel, imagePrompt: newPrompt, isGenerating: true }
          : panel
      )
    );

    // Simulate image regeneration with new prompt
    setTimeout(() => {
      const imageSet = mockImageSets[Math.floor(Math.random() * mockImageSets.length)];
      setPanels(currentPanels =>
        currentPanels.map(panel =>
          panel.id === panelId
            ? { 
                ...panel, 
                isGenerating: false,
                imageUrl: imageSet.main,
                alternativeImages: imageSet.alternatives
              }
            : panel
        )
      );
    }, 3000);
  };

  const handleApplyGlobalStyle = (stylePrompt: string) => {
    setGlobalStylePrompt(stylePrompt);
    
    // Regenerate all panels with global style
    setPanels(currentPanels =>
      currentPanels.map(panel => ({
        ...panel,
        isGenerating: true
      }))
    );

    // Simulate regeneration of all images with new style
    panels.forEach((panel, index) => {
      setTimeout(() => {
        const imageSet = mockImageSets[index % mockImageSets.length];
        setPanels(currentPanels =>
          currentPanels.map(p =>
            p.id === panel.id
              ? {
                  ...p,
                  isGenerating: false,
                  imageUrl: imageSet.main,
                  alternativeImages: imageSet.alternatives
                }
              : p
          )
        );
      }, (index + 1) * 1500);
    });
  };

  const handleStartOver = () => {
    setPanels([]);
    setIsProcessing(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Logout */}
        <div className="relative text-center space-y-4 py-8">
          {/* User Info and Logout Button */}
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-purple-200 shadow-sm">
              <div className="w-6 h-6 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm">{currentUser}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">일기 만화 생성기</h1>
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
              globalStylePrompt={globalStylePrompt}
              onRegenerate={handleRegenerate}
              onSelectAlternative={handleSelectAlternative}
              onUpdatePrompt={handleUpdatePrompt}
              onApplyGlobalStyle={handleApplyGlobalStyle}
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