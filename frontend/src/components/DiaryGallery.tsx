import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Eye, Calendar, Search, Filter, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DiaryComic {
  id: string;
  title: string;
  date: string;
  panelCount: number;
  thumbnailUrl: string;
  excerpt: string;
  tags: string[];
}

interface DiaryGalleryProps {
  onViewComic: (comicId: string) => void;
  onCreateNew: () => void;
}

export function DiaryGallery({ onViewComic, onCreateNew }: DiaryGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Mock data for diary comics
  const diaryComics: DiaryComic[] = [
    {
      id: '1',
      title: '특별한 하루',
      date: '2024-09-19',
      panelCount: 6,
      thumbnailUrl: 'https://images.unsplash.com/photo-1731661553530-9fa227db04ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JuaW5nJTIwY29mZmVlJTIwc3VubGlnaHR8ZW58MXx8fHwxNzU4MjkxNjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: '오늘은 정말 특별한 하루였다. 아침에 일어나서 창문을 열었는데 햇살이 너무 따뜻했다...',
      tags: ['일상', '행복', '카페']
    },
    {
      id: '2',
      title: '가을 산책',
      date: '2024-09-18',
      panelCount: 4,
      thumbnailUrl: 'https://images.unsplash.com/photo-1643983702094-9913662d8f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBwYXJrJTIwd2Fsa3xlbnwxfHx8fDE3NTgyOTE2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: '공원을 산책하며 가을 단풍을 구경했다. 나뭇잎들이 노랗고 빨갛게 물들어 있어서...',
      tags: ['가을', '산책', '자연']
    },
    {
      id: '3',
      title: '친구와의 만남',
      date: '2024-09-17',
      panelCount: 5,
      thumbnailUrl: 'https://images.unsplash.com/photo-1526865906320-0200a6e2c7f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2FmZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4MjkxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: '오랜만에 친구를 만나서 새로운 카페에 갔다. 그곳의 분위기가 너무 좋았고...',
      tags: ['친구', '카페', '대화']
    },
    {
      id: '4',
      title: '평온한 저녁',
      date: '2024-09-16',
      panelCount: 3,
      thumbnailUrl: 'https://images.unsplash.com/photo-1731661553530-9fa227db04ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JuaW5nJTIwY29mZmVlJTIwc3VubGlnaHR8ZW58MXx8fHwxNzU4MjkxNjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: '집에서 조용히 차를 마시며 책을 읽었다. 창밖으로 보이는 저녁 노을이...',
      tags: ['평온', '독서', '저녁']
    },
    {
      id: '5',
      title: '새로운 도전',
      date: '2024-09-15',
      panelCount: 7,
      thumbnailUrl: 'https://images.unsplash.com/photo-1643983702094-9913662d8f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBwYXJrJTIwd2Fsa3xlbnwxfHx8fDE3NTgyOTE2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: '오늘은 새로운 것에 도전해보았다. 처음에는 두려웠지만 막상 시작해보니...',
      tags: ['도전', '성장', '용기']
    },
    {
      id: '6',
      title: '가족과 함께',
      date: '2024-09-14',
      panelCount: 4,
      thumbnailUrl: 'https://images.unsplash.com/photo-1526865906320-0200a6e2c7f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwY2FmZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4MjkxNjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: '가족들과 함께 저녁을 먹으며 하루를 마무리했다. 오늘도 감사한 하루였다...',
      tags: ['가족', '저녁', '감사']
    }
  ];

  const allTags = Array.from(new Set(diaryComics.flatMap(comic => comic.tags)));

  const filteredComics = diaryComics.filter(comic => {
    const matchesSearch = comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comic.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || comic.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">내 일기 만화 갤러리</h2>
          <p className="text-muted-foreground">
            지금까지 만든 {diaryComics.length}개의 일기 만화를 확인해보세요
          </p>
        </div>
        
        <Button onClick={onCreateNew}>
          새 일기 작성하기
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="일기 제목이나 내용으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedTag === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                전체
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comics Grid */}
      {filteredComics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComics.map(comic => (
            <Card key={comic.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <div onClick={() => onViewComic(comic.id)}>
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={comic.thumbnailUrl}
                    alt={comic.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-1">{comic.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewComic(comic.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          보기
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(comic.date)}
                    <span>•</span>
                    <span>{comic.panelCount}컷</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {comic.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {comic.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
            <p className="text-muted-foreground mb-4">
              다른 검색어를 사용하거나 필터를 변경해보세요
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedTag(null);
            }}>
              필터 초기화
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}