import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { BookOpen, Mail, Lock, Sparkles, Eye, EyeOff } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For testing: always succeed
      // TODO: Replace with actual authentication logic
      if (isSignUp) {
        // Sign up logic
        if (password !== confirmPassword) {
          alert('비밀번호가 일치하지 않습니다.');
          setIsLoading(false);
          return;
        }
        // In production, this would create a new user account
        onLogin(email);
      } else {
        // Login logic
        // In production, this would verify email and password
        onLogin(email);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: 'google' | 'kakao') => {
    // TODO: Implement actual OAuth flow with the provider
    // For testing, simulate login
    setIsLoading(true);
    setTimeout(() => {
      onLogin(`${provider}_user@example.com`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-orange-500 bg-clip-text text-transparent mb-2">
              일기 만화 생성기
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? '일상의 순간들이 아름다운 스토리로 재탄생됩니다' : '일상의 순간들이 아름다운 스토리로 재탄생됩니다'}
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="border-2 border-purple-200 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {isSignUp ? '회원가입' : '로그인'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up Only) */}
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력하세요"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 hover:from-pink-600 hover:via-purple-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    처리중...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {isSignUp ? '회원가입' : '로그인'}
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">또는</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google로 계속하기</span>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-2 border-yellow-400 bg-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 transition-all"
                onClick={() => handleSocialLogin('kakao')}
                disabled={isLoading}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 3C6.486 3 2 6.262 2 10.315c0 2.59 1.691 4.873 4.244 6.224-.175.645-.606 2.25-.697 2.61-.108.436.16.43.338.313.143-.093 2.266-1.52 3.124-2.1.63.088 1.282.134 1.991.134 5.514 0 10-3.262 10-7.315S17.514 3 12 3z"
                      fill="#3C1E1E"
                    />
                  </svg>
                  <span className="text-[#3C1E1E]">카카오로 계속하기</span>
                </div>
              </Button>
            </div>

            {/* Toggle between Login/SignUp */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isSignUp ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}{' '}
                <Button
                  variant="link"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setShowPassword(false);
                    setShowConfirmPassword(false);
                  }}
                  className="text-purple-600 hover:text-purple-700 p-0 h-auto"
                >
                  {isSignUp ? '로그인' : '회원가입'}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Mode Notice */}
        <div className="text-center">
          <div className="inline-block px-4 py-2 bg-orange-100 border border-orange-200 rounded-lg">
            <p className="text-xs text-orange-800">
              🧪 <strong>테스트 모드:</strong> 아무 정보나 입력해도 로그인됩니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
