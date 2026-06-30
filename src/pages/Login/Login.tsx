import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth, googleProvider, githubProvider } from "../../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = useMemo(() => {
    const v = email.trim();
    return v.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const canSubmit = isEmailValid && password.trim().length > 0;

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("token", await result.user.getIdToken());
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google login failed");
    }
  };

  const loginGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      localStorage.setItem("token", await result.user.getIdToken());
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("GitHub login failed");
    }
  };

  const submit = async () => {
    if (!canSubmit) return;

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem(
        "token",
        await credential.user.getIdToken()
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">
      <div className="max-w-6xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left marketing hero */}
        <div className="px-6 md:px-12 py-16 relative min-h-[60vh] md:min-h-[80vh]">
          <div className="text-white max-w-lg">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Data-Driven SEO.
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-6">
              Powered by AI.
            </h3>
            <p className="text-slate-300 mb-6">
              Stop guessing. Start ranking. Let our engine analyze your
              competitors and give you the exact HTML fixes you need to reach
              page one.
            </p>
          </div>
          <p className="text-slate-500 text-sm absolute bottom-6 md:bottom-10 left-6 md:left-12">
            © 2026 SEO INSIGHT ENGINE. BUILT FOR DEVELOPERS.
          </p>
        </div>

        {/* Right glass login card */}
        <div className="flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-md bg-linear-to-b from-white/6 via-white/4 to-white/3 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-linear-to-br from-purple-600/30 to-pink-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center mb-4">
              <div className="w-2/3">
                <div className="flex gap-6 items-center">
                  <button className="text-xs uppercase tracking-wider text-sky-300 border-b-2 border-sky-400 pb-2">
                    Log In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-xs uppercase tracking-wider text-slate-300"
                  >
                    Create Account
                  </button>
                </div>
                <h4 className="text-slate-100 text-2xl font-semibold mt-4">
                  Welcome Back
                </h4>
                <p className="text-slate-400 text-sm">
                  Enter your credentials to access your SEO dashboard.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={loginGoogle}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-2 rounded-md"
              >
                <img src="/src/assets/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Sign in with Google</span>
              </button>

              <button
                type="button"
                onClick={loginGithub}
                className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-slate-200 py-2 rounded-md"
              >
                <img src="/src/assets/github.svg" alt="GitHub" className="w-5 h-5" />
                <span className="text-sm">Sign in with GitHub</span>
              </button>
            </div>

            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-white/10" />
              <div className="px-3 text-xs text-slate-400">OR</div>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="mb-3">
              <label className="block text-slate-300 text-xs mb-1">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  📧
                </span>
                <input
                  className="w-full pl-10 p-3 rounded-md mb-2 bg-white/5 border border-white/5 text-white placeholder:text-slate-400"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-slate-300 text-xs mb-1">
                  PASSWORD
                </label>
                <button className="text-xs text-sky-300">Forgot Password?</button>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 p-3 rounded-md bg-white/5 border border-white/5 text-white placeholder:text-slate-400"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              disabled={!canSubmit}
              onClick={submit}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-md mb-3"
            >
              Sign In to Dashboard →
            </button>

            <p className="text-center text-slate-400 text-xs">
              By signing in, you agree to our{" "}
              <span className="text-sky-300">Terms of Service</span> and{" "}
              <span className="text-sky-300">Privacy policy</span>
            </p>

            <div className="mt-4 text-center text-slate-300 text-sm">
              Don't have an account yet?{" "}
              <button onClick={() => navigate("/signup")} className="text-sky-300">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

