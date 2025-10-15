import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RefreshCw, Download, Check, Edit, Save, X } from 'lucide-react';

interface ComicPanelProps {
  panelNumber: number;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  isGenerating?: boolean;
  alternativeImages?: string[];
  onRegenerate?: () => void;
  onSelectAlternative?: (imageUrl: string) => void;
  onUpdatePrompt?: (newPrompt: string) => void;
}

export function ComicPanel({ 
  panelNumber, 
  text, 
  imagePrompt, 
  imageUrl, 
  isGenerating = false,
  alternativeImages = [],
  onRegenerate,
  onSelectAlternative,
  onUpdatePrompt
}: ComicPanelProps) {
  const [imageError, setImageError] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(imagePrompt);

  const handleSavePrompt = () => {
    if (onUpdatePrompt && editedPrompt.trim()) {
      onUpdatePrompt(editedPrompt);
      setIsEditingPrompt(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedPrompt(imagePrompt);
    setIsEditingPrompt(false);
  };

  return (
    <Card className="w-full overflow-hidden border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-lg">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-3 bg-gradient-to-r from-pink-50 via-purple-50 to-transparent">
          <Badge variant="secondary" className="gap-1.5 bg-gradient-to-r from-pink-100 to-purple-100 border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
            컷 {panelNumber}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRegenerate}
            disabled={isGenerating}
            className="h-8 gap-1.5 text-xs hover:bg-primary/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            재생성
          </Button>
        </div>

        {/* Main Image */}
        <div className="px-4">
          <div className="aspect-[4/3] bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-orange-100/30 rounded-xl overflow-hidden relative group border border-purple-100">
            {isGenerating ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="relative w-12 h-12 mx-auto">
                    <div className="absolute inset-0 border-4 border-purple-200 rounded-full" />
                    <div className="absolute inset-0 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">이미지 생성 중...</p>
                    <p className="text-xs text-muted-foreground">잠시만 기다려주세요</p>
                  </div>
                </div>
              </div>
            ) : imageUrl && !imageError ? (
              <>
                <ImageWithFallback
                  src={imageUrl}
                  alt={`Comic panel ${panelNumber}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImageError(true)}
                />
                {/* Overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="text-center space-y-2 p-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-xl flex items-center justify-center mx-auto shadow-md">
                    <Download className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">이미지 준비 중</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Alternative Images Section */}
        {!isGenerating && alternativeImages.length > 0 && (
          <div className="px-4 pt-3">
            <button 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors mb-2 flex items-center gap-1"
              onClick={() => setShowAlternatives(!showAlternatives)}
            >
              다른 이미지 {showAlternatives ? '숨기기' : '보기'} ({alternativeImages.length})
              <span className={`transform transition-transform ${showAlternatives ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            
            {showAlternatives && (
              <div className="grid grid-cols-3 gap-2 mb-3">
                {alternativeImages.map((altImage, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (onSelectAlternative) {
                        onSelectAlternative(altImage);
                        setShowAlternatives(false);
                      }
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      imageUrl === altImage 
                        ? 'border-purple-500 ring-2 ring-purple-200 shadow-md' 
                        : 'border-purple-200 hover:border-purple-400 hover:scale-105'
                    }`}
                  >
                    <ImageWithFallback
                      src={altImage}
                      alt={`Alternative ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {imageUrl === altImage && (
                      <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-md">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Text Content */}
        <div className="px-4 pb-4 space-y-3">
          <div className="bg-gradient-to-br from-accent/70 to-accent/40 p-3 rounded-lg border border-accent-foreground/5">
            <p className="text-sm leading-relaxed">{text}</p>
          </div>
          
          {/* Prompt Section - Editable */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">이미지 프롬프트</span>
              {!isEditingPrompt && onUpdatePrompt && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingPrompt(true)}
                  className="h-6 gap-1 text-xs"
                >
                  <Edit className="w-3 h-3" />
                  수정
                </Button>
              )}
            </div>
            
            {isEditingPrompt ? (
              <div className="space-y-2">
                <Textarea
                  value={editedPrompt}
                  onChange={(e) => setEditedPrompt(e.target.value)}
                  className="text-xs min-h-[80px] resize-none"
                  placeholder="이미지 생성 프롬프트를 입력하세요..."
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSavePrompt}
                    className="flex-1 gap-1.5 h-8"
                    disabled={!editedPrompt.trim()}
                  >
                    <Save className="w-3.5 h-3.5" />
                    적용하고 재생성
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="gap-1.5 h-8"
                  >
                    <X className="w-3.5 h-3.5" />
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground border border-border/50 leading-relaxed">
                {imagePrompt}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
