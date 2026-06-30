import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import {
  auth,
  googleProvider,
  githubProvider
} from "../../firebase/firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signupGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("token", await result.user.getIdToken());
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google sign up failed");
    }
  };

  const signupGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      localStorage.setItem("token", await result.user.getIdToken());
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("GitHub sign up failed");
    }
  };

  const submit = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: `${firstName} ${lastName}`
      });

      localStorage.setItem("token", await credential.user.getIdToken());
      navigate("/dashboard");
    } catch (error) {
      const firebaseError = error as { code?: string; message?: string };
      console.error("signup error:", firebaseError);
      console.error("firebase code:", firebaseError?.code);
      console.error("firebase message:", firebaseError?.message);
      alert(firebaseError?.message ?? "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center">
      <div className="max-w-6xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left marketing hero */}
        <div className="px-6 md:px-12 py-16 relative min-h-[60vh] md:min-h-[80vh]">
          <div className="text-white max-w-lg">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Data-Driven SEO.</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-6">Powered by AI.</h3>
            <p className="text-slate-300 mb-6">
              Stop guessing. Start ranking. Let our engine analyze your competitors and give you the exact HTML fixes you need to reach page one.
            </p>
          </div>
          <p className="text-slate-500 text-sm absolute bottom-6 md:bottom-10 left-6 md:left-12">
            © 2026 SEO INSIGHT ENGINE. BUILT FOR DEVELOPERS.
          </p>
        </div>

        {/* Right glass signup card */}
        <div className="flex items-center justify-center px-6 md:px-12 py-12">
          <div className="w-full max-w-md bg-linear-to-b from-white/6 via-white/4 to-white/3 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-linear-to-br from-purple-600/30 to-pink-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center mb-4">
              <div className="w-2/3">
                <div className="flex gap-6 items-center">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-xs uppercase tracking-wider text-slate-300 pb-2"
                  >
                    Log In
                  </button>
                  <button className="text-xs uppercase tracking-wider text-sky-300 border-b-2 border-sky-400 pb-2">
                    Create Account
                  </button>
                </div>
                <h4 className="text-slate-100 text-2xl font-semibold mt-4">Create Your Account</h4>
                <p className="text-slate-400 text-sm">Join us and start optimizing your SEO today.</p>
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={signupGoogle}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-2 rounded-md"
              >
                <img src="/src/assets/google.svg" alt="Google" className="w-5 h-5" />
                <span className="text-sm">Sign up with Google</span>
              </button>

              <button
                type="button"
                onClick={signupGithub}
                className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-slate-200 py-2 rounded-md"
              >
                <img src="/src/assets/github.svg" alt="GitHub" className="w-5 h-5" />
                <span className="text-sm">Sign up with GitHub</span>
              </button>
            </div>

            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-white/10" />
              <div className="px-3 text-xs text-slate-400">OR</div>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* First Name and Last Name in grid */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-slate-300 text-xs mb-1">FIRST NAME</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
                  <input
                    className="w-full pl-10 p-3 rounded-md bg-white/5 border border-white/5 text-white placeholder:text-slate-400"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-xs mb-1">LAST NAME</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">👤</span>
                  <input
                    className="w-full pl-10 p-3 rounded-md bg-white/5 border border-white/5 text-white placeholder:text-slate-400"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-slate-300 text-xs mb-1">EMAIL ADDRESS</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">📧</span>
                <input
                  className="w-full pl-10 p-3 rounded-md mb-2 bg-white/5 border border-white/5 text-white placeholder:text-slate-400"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-slate-300 text-xs mb-1">PASSWORD</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔒</span>
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
              onClick={submit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md mb-3"
            >
              Create Account →
            </button>

            <p className="text-center text-slate-400 text-xs">
              By signing up, you agree to our <span className="text-sky-300">Terms of Service</span> and{" "}
              <span className="text-sky-300">Privacy policy</span>
            </p>

            <div className="mt-4 text-center text-slate-300 text-sm">
              Already have an account?{" "}
              <button onClick={() => navigate("/login")} className="text-sky-300">
                Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

