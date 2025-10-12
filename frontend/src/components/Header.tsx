import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu';
import { BookOpen, User, LogOut, Library, PenTool } from 'lucide-react';

interface User {
  email: string;
  name: string;
}

interface HeaderProps {
  user: User;
  currentView: 'create' | 'gallery';
  onViewChange: (view: 'create' | 'gallery') => void;
  onLogout: () => void;
}

export function Header({ user, currentView, onViewChange, onLogout }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">일기 만화 생성기</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={currentView === 'create' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('create')}
            >
              <PenTool className="w-4 h-4 mr-2" />
              새 일기 작성
            </Button>
            <Button
              variant={currentView === 'gallery' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('gallery')}
            >
              <Library className="w-4 h-4 mr-2" />
              내 일기 갤러리
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-muted-foreground">
            안녕하세요, {user.name}님
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewChange('create')}>
                <PenTool className="w-4 h-4 mr-2" />
                새 일기 작성
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onViewChange('gallery')}>
                <Library className="w-4 h-4 mr-2" />
                내 일기 갤러리
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}