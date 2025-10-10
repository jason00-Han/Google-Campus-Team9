import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { PenTool, Sparkles } from 'lucide-react';

interface DiaryInputProps {
  onSubmit: (diary: string) => void;
  isLoading?: boolean;
}

export function DiaryInput({ onSubmit, isLoading = false }: DiaryInputProps) {
  const [diaryText, setDiaryText] = useState('');

  const handleSubmit = () => {
    if (diaryText.trim()) {
      onSubmit(diaryText);
    }
  };

  const exampleDiary = "오늘은 정말 특별한 하루였다. 아침에 일어나서 창문을 열었는데 햇살이 너무 따뜻했다. 커피를 마시면서 베란다에서 새들의 지저귐을 들었다. 점심에는 친구와 만나서 새로운 카페에 갔는데, 그곳의 케이크가 정말 맛있었다. 오후에는 공원을 산책하며 가을 단풍을 구경했다. 저녁에 집에 돌아와서는 좋아하는 드라마를 보며 하루를 마무리했다.";

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenTool className="w-5 h-5" />
          일기 작성하기
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="오늘 하루 있었던 일을 자유롭게 작성해보세요..."
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
            className="min-h-32 resize-none"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setDiaryText(exampleDiary)}
            variant="outline"
            size="sm"
          >
            예시 일기 사용
          </Button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!diaryText.trim() || isLoading}
          className="w-full"
          size="lg"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isLoading ? '만화 생성 중...' : '만화로 변환하기'}
        </Button>
      </CardContent>
    </Card>
  );
}