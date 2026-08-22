import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Logo from "../components/Logo";

// Simple inline "G" mark so we don't pull in an external brand asset.
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.38l3.99-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l3.99 3.1C6.22 6.87 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthPlaceholder = (event) => {
    event.preventDefault();
    // Firebase/Google auth integration will replace this navigation.
    navigate("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Background: agricultural field photo with a soft dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Login card */}
      <div className="relative w-full max-w-sm rounded-xl2 border border-white/40 bg-agri-surface/90 p-8 shadow-panel backdrop-blur-md animate-fade-in transition-theme">
        <div className="flex flex-col items-center text-center">
          <Logo size="lg" withWordmark={false} />
          <h1 className="mt-3 font-display text-2xl font-bold text-agri-primary-dark dark:text-agri-primary-light">
            AgriSage
          </h1>
          <p className="mt-1 text-sm text-agri-text-muted">Smart Insights for Smarter Farming</p>
        </div>

        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-agri-text">Welcome Back!</h2>
          <p className="mt-1 text-sm text-agri-text-muted">Login to continue to AgriSage</p>
        </div>

        <form className="mt-6 space-y-3" onSubmit={handleAuthPlaceholder}>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-text-muted" />
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full rounded-full border border-agri-border bg-agri-surface-alt
                py-2.5 pl-10 pr-4 text-sm text-agri-text placeholder:text-agri-text-muted
                outline-none transition-theme focus:border-agri-primary"
            />
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-agri-text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full rounded-full border border-agri-border bg-agri-surface-alt
                py-2.5 pl-10 pr-10 text-sm text-agri-text placeholder:text-agri-text-muted
                outline-none transition-theme focus:border-agri-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-agri-text-muted hover:text-agri-text"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full
              bg-agri-primary py-2.5 text-sm font-semibold text-white transition-theme
              hover:bg-agri-primary-dark"
          >
            <GoogleIcon />
            Login with Google
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-agri-border" />
          <span className="text-xs text-agri-text-muted">or</span>
          <span className="h-px flex-1 bg-agri-border" />
        </div>

        <button
          type="button"
          onClick={handleAuthPlaceholder}
          className="flex w-full items-center justify-center gap-2 rounded-full
            border border-agri-border bg-agri-surface py-2.5 text-sm font-semibold
            text-agri-text transition-theme hover:border-agri-primary-light"
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-xs leading-relaxed text-agri-text-muted">
          By continuing, you agree to our Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
