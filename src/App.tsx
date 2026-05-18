import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signInWithRedirect, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { Button } from '@/components/ui/button';
import { Bot, Home, BookOpen, LogOut, Loader2, Menu } from 'lucide-react';

// Import Pages
import DashboardPage from './pages/Dashboard';
import ChatbotPage from './pages/Chatbot';
import FAQPage from './pages/FAQ';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user ? (
        <AuthenticatedLayout user={user} onSignOut={() => signOut(auth)}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatbotPage user={user} />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthenticatedLayout>
      ) : (
        <LoginPage />
      )}
    </BrowserRouter>
  );
}

function LoginPage() {
  const handleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      alert("Failed to sign in. Please try again in a new tab.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] font-sans p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full border-t-[6px] border-[#002d54]">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#e1ae05] rounded-full flex items-center justify-center mx-auto mb-4 text-[#002d54]">
            <Bot size={40} />
          </div>
          <h1 className="text-3xl font-bold text-[#002d54] tracking-tight">BUP-Guide</h1>
          <p className="text-slate-500 mt-2 text-sm">Bicol University Campus Virtual Assistant</p>
        </div>
        <div className="space-y-4">
          <Button 
            className="w-full bg-[#002d54] hover:bg-blue-900 text-white py-6 text-base font-bold shadow-sm" 
            onClick={handleLogin}
          >
            Sign In with Google
          </Button>
          <p className="text-xs text-center text-slate-400 mt-4 leading-relaxed">
            By signing in, you agree to store basic profile and chat data securely per Bicol University guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}

function AuthenticatedLayout({ children, user, onSignOut }: { children: React.ReactNode, user: User, onSignOut: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5 opacity-80" /> },
    { path: '/chat', label: 'Virtual Assistant', icon: <Bot className="w-5 h-5 opacity-80" /> },
    { path: '/faq', label: 'University FAQ', icon: <BookOpen className="w-5 h-5 opacity-80" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col md:flex-row font-sans text-slate-800">
      <div className="md:hidden flex items-center justify-between bg-[#002d54] text-white p-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-[#e1ae05] text-[#002d54] px-2 py-1 rounded text-sm">BU</span>
          <span>BUP-Guide</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
      </div>

      <nav className={`
        fixed md:static inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 bg-[#002d54] text-white flex flex-col z-50
      `}>
        <div className="p-6 border-b border-blue-900 hidden md:block">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="bg-[#e1ae05] text-[#002d54] px-2 py-1 rounded">BU</span>
            BUP-Guide
          </h1>
          <p className="text-xs text-blue-300 mt-1 uppercase tracking-widest font-semibold">Computer Department</p>
        </div>
        
        <div className="flex-1 py-4 flex flex-col">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path}
                className={`px-6 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                  isActive ? 'bg-blue-900 border-l-4 border-[#e1ae05]' : 'hover:bg-blue-800 opacity-70'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </Link>
            )
          })}
        </div>

        <div className="p-6 text-xs text-blue-400 bg-[#001f3a] flex flex-col gap-4">
          <div className="flex items-center px-2 truncate">
            <div className="w-8 h-8 rounded-full bg-blue-900 font-bold flex items-center justify-center shrink-0 text-white">
              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 truncate">
              <p className="font-medium text-white">{user.displayName || 'Student'}</p>
              <p className="text-xs text-blue-300 truncate">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-blue-200 hover:text-white hover:bg-blue-800" onClick={onSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col h-screen md:h-auto overflow-hidden md:overflow-auto">
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">Welcome back,</span>
            <span className="font-bold text-slate-800">{user.displayName || 'Student'}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs border border-slate-300 rounded hover:bg-slate-50 font-medium">Student Portal</button>
              <button className="px-3 py-1 text-xs bg-[#e1ae05] text-[#002d54] font-bold rounded hover:bg-[#c99b04]">Settings</button>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 text-blue-900 flex items-center justify-center font-bold">
              {user.displayName?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-[#f0f4f8] relative">
           {children}
        </div>
      </main>
    </div>
  );
}
