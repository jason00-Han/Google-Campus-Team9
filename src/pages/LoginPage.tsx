import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BookOpen, Palette, Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 로그인 로직 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      navigate('/diary'); 
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} 로그인은 곧 구현될 예정입니다!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-16 h-16 bg-purple-300/30 rounded-full blur-xl"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {/* 헤더 섹션 */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <Palette className="w-8 h-8 text-purple-500" />
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            
            <div>
              <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                일기 만화 생성기
              </h1>
              <p className="text-muted-foreground mt-2">
                당신의 소중한 일기를 AI가 감성적인 만화로 변환해드립니다
              </p>
            </div>
          </div>

          {/* 로그인 카드 */}
          <Card className="backdrop-blur-sm bg-white/80 border-white/50 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center">로그인</CardTitle>
              <CardDescription className="text-center">
                일상의 순간들이 아름다운 스토리로 재탄생됩니다
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/50"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  disabled={isLoading}
                >
                  {isLoading ? "로그인 중..." : "로그인"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white/80 px-2 text-muted-foreground">또는</span>
                </div>
              </div>

              {/* 소셜 로그인 */}
              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-white/50 hover:bg-white/70"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google로 계속하기
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-white/50 hover:bg-white/70"
                  onClick={() => handleSocialLogin("Kakao")}
                >
                  <div className="w-4 h-4 mr-2 bg-yellow-400 rounded-sm flex items-center justify-center">
                    <span className="text-black font-bold text-xs">K</span>
                  </div>
                  카카오로 계속하기
                </Button>
              </div>

              {/* 회원가입 링크 */}
              <div className="text-center pt-4">
                <p className="text-muted-foreground">
                  아직 계정이 없으신가요?{" "}
                  <button 
                    type="button"
                    className="text-purple-600 hover:text-purple-700 hover:underline"
                    onClick={() => alert("회원가입 페이지는 곧 구현될 예정입니다!")}
                  >
                    회원가입
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 하단 메시지 */}
          <div className="text-center text-muted-foreground">
            <p>일상의 작은 순간들을 특별한 추억으로 ✨</p>
          </div>
        </div>
      </div>
    </div>
  );
}