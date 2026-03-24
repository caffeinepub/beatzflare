import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

interface StoredUser {
  username: string;
  password: string;
}

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem("beatzflare_users") || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem("beatzflare_users", JSON.stringify(users));
}

function doLogin(username: string) {
  localStorage.setItem(
    "beatzflare_user",
    JSON.stringify({ username, loggedIn: true }),
  );
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const uname = loginUsername.trim();
    const pass = loginPassword;
    if (!uname) {
      setLoginError("Username is required.");
      return;
    }
    if (pass.length < 6) {
      setLoginError("Password must be at least 6 characters.");
      return;
    }
    const users = getUsers();
    const existing = users.find(
      (u) => u.username.toLowerCase() === uname.toLowerCase(),
    );
    if (existing) {
      if (existing.password !== pass) {
        setLoginError("Wrong password. Please try again.");
        return;
      }
      doLogin(existing.username);
      onLogin(existing.username);
    } else {
      const newUser: StoredUser = { username: uname, password: pass };
      users.push(newUser);
      saveUsers(users);
      doLogin(uname);
      onLogin(uname);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");
    const uname = signupUsername.trim();
    if (!uname) {
      setSignupError("Username is required.");
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters.");
      return;
    }
    if (signupPassword !== signupConfirm) {
      setSignupError("Passwords do not match.");
      return;
    }
    const users = getUsers();
    if (users.find((u) => u.username.toLowerCase() === uname.toLowerCase())) {
      setSignupError("Username already taken.");
      return;
    }
    users.push({ username: uname, password: signupPassword });
    saveUsers(users);
    doLogin(uname);
    onLogin(uname);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: "oklch(0.07 0.005 48)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient radial gradient */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.65 0.14 72 / 0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.45 }}
      >
        {/* Logo header */}
        <div className="text-center mb-7">
          <img
            src="/assets/generated/beatzflare-logo.dim_600x400.png"
            alt="BEATZFLARE"
            className="h-16 w-auto mx-auto mb-3"
          />
          <p
            className="font-display text-[11px] tracking-[0.35em] uppercase font-semibold"
            style={{ color: "oklch(0.72 0.13 68 / 0.75)" }}
          >
            Premium Music Experience
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-7 sm:p-8"
          style={{
            background: "oklch(0.10 0.008 50)",
            border: "1px solid oklch(0.72 0.13 68 / 0.18)",
            boxShadow:
              "0 0 40px oklch(0.72 0.13 68 / 0.07), 0 24px 48px oklch(0 0 0 / 0.4)",
          }}
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList
              className="w-full mb-6"
              style={{
                background: "oklch(0.14 0.009 50)",
                borderRadius: "10px",
                padding: "3px",
              }}
            >
              <TabsTrigger
                value="login"
                data-ocid="auth.tab"
                className="flex-1 font-body text-sm data-[state=active]:font-semibold"
                style={{ borderRadius: "8px" }}
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                data-ocid="auth.tab"
                className="flex-1 font-body text-sm data-[state=active]:font-semibold"
                style={{ borderRadius: "8px" }}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-username"
                    className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Username
                  </Label>
                  <Input
                    id="login-username"
                    data-ocid="auth.input"
                    placeholder="Enter your username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="font-body placeholder:text-muted-foreground/40 focus-visible:ring-1"
                    style={{
                      background: "oklch(0.135 0.008 50)",
                      borderColor: "oklch(0.22 0.009 52)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-password"
                    className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    data-ocid="auth.input"
                    type="password"
                    placeholder="Min 6 characters"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="font-body placeholder:text-muted-foreground/40 focus-visible:ring-1"
                    style={{
                      background: "oklch(0.135 0.008 50)",
                      borderColor: "oklch(0.22 0.009 52)",
                    }}
                  />
                </div>

                {loginError && (
                  <p
                    data-ocid="auth.error_state"
                    className="font-body text-sm rounded-lg px-3 py-2"
                    style={{
                      color: "oklch(0.7 0.18 25)",
                      background: "oklch(0.577 0.245 27 / 0.1)",
                    }}
                  >
                    {loginError}
                  </p>
                )}

                <Button
                  type="submit"
                  data-ocid="auth.submit_button"
                  className="w-full font-display font-semibold tracking-wide mt-2"
                  style={{
                    background: "oklch(0.72 0.13 68)",
                    color: "oklch(0.07 0.005 48)",
                  }}
                >
                  Login to BEATZFLARE
                </Button>

                <p
                  className="font-body text-center text-xs"
                  style={{ color: "oklch(0.52 0.009 60)" }}
                >
                  New here? Just enter any username &amp; password.
                </p>

                <SocialLoginButtons onLogin={onLogin} />
              </form>
            </TabsContent>

            {/* Signup tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="signup-username"
                    className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Username
                  </Label>
                  <Input
                    id="signup-username"
                    data-ocid="auth.input"
                    placeholder="Choose a username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="font-body placeholder:text-muted-foreground/40 focus-visible:ring-1"
                    style={{
                      background: "oklch(0.135 0.008 50)",
                      borderColor: "oklch(0.22 0.009 52)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="signup-password"
                    className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    data-ocid="auth.input"
                    type="password"
                    placeholder="Min 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="font-body placeholder:text-muted-foreground/40 focus-visible:ring-1"
                    style={{
                      background: "oklch(0.135 0.008 50)",
                      borderColor: "oklch(0.22 0.009 52)",
                    }}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="signup-confirm"
                    className="font-body text-xs uppercase tracking-wider text-muted-foreground"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm"
                    data-ocid="auth.input"
                    type="password"
                    placeholder="Repeat password"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    className="font-body placeholder:text-muted-foreground/40 focus-visible:ring-1"
                    style={{
                      background: "oklch(0.135 0.008 50)",
                      borderColor: "oklch(0.22 0.009 52)",
                    }}
                  />
                </div>

                {signupError && (
                  <p
                    data-ocid="auth.error_state"
                    className="font-body text-sm rounded-lg px-3 py-2"
                    style={{
                      color: "oklch(0.7 0.18 25)",
                      background: "oklch(0.577 0.245 27 / 0.1)",
                    }}
                  >
                    {signupError}
                  </p>
                )}

                <Button
                  type="submit"
                  data-ocid="auth.submit_button"
                  className="w-full font-display font-semibold tracking-wide mt-2"
                  style={{
                    background: "oklch(0.72 0.13 68)",
                    color: "oklch(0.07 0.005 48)",
                  }}
                >
                  Create Account
                </Button>

                <SocialLoginButtons onLogin={onLogin} />
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Credits */}
        <div className="text-center mt-5 space-y-0.5">
          <p
            className="font-body text-[11px] font-semibold tracking-wider uppercase"
            style={{ color: "oklch(0.72 0.13 68 / 0.5)" }}
          >
            Developed by ADARSH CHAUDHARY
          </p>
          <p
            className="font-body text-[11px]"
            style={{ color: "oklch(0.42 0.006 55)" }}
          >
            Powered by MR. DINESH KUMAR CHAUDHARY
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Social login buttons shared between Login and Signup tabs
function SocialLoginButtons({ onLogin }: { onLogin: (u: string) => void }) {
  return (
    <>
      <div className="flex items-center gap-3 pt-1">
        <div
          className="flex-1 h-px"
          style={{ background: "oklch(0.22 0.009 52)" }}
        />
        <span
          className="font-body text-[11px] tracking-widest uppercase"
          style={{ color: "oklch(0.42 0.006 55)" }}
        >
          Or continue with
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "oklch(0.22 0.009 52)" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            doLogin("Google User");
            onLogin("Google User");
          }}
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 font-body text-sm font-medium transition-opacity hover:opacity-80"
          style={{
            background: "oklch(0.135 0.008 50)",
            border: "1px solid oklch(0.22 0.009 52)",
            color: "oklch(0.94 0.005 68)",
          }}
          data-ocid="auth.button"
        >
          <span className="text-[15px] font-black" style={{ color: "#DB4437" }}>
            G
          </span>
          Google
        </button>
        <button
          type="button"
          onClick={() => {
            doLogin("Apple User");
            onLogin("Apple User");
          }}
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 font-body text-sm font-medium transition-opacity hover:opacity-80"
          style={{
            background: "oklch(0.135 0.008 50)",
            border: "1px solid oklch(0.22 0.009 52)",
            color: "oklch(0.94 0.005 68)",
          }}
          data-ocid="auth.button"
        >
          <span className="text-base">🍎</span>
          Apple
        </button>
        <button
          type="button"
          onClick={() => {
            doLogin("Facebook User");
            onLogin("Facebook User");
          }}
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 font-body text-sm font-medium transition-opacity hover:opacity-80"
          style={{
            background: "oklch(0.135 0.008 50)",
            border: "1px solid oklch(0.22 0.009 52)",
            color: "oklch(0.94 0.005 68)",
          }}
          data-ocid="auth.button"
        >
          <span className="font-black text-base" style={{ color: "#1877F2" }}>
            f
          </span>
          Facebook
        </button>
        <button
          type="button"
          onClick={() => {
            doLogin("Phone User");
            onLogin("Phone User");
          }}
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 px-3 font-body text-sm font-medium transition-opacity hover:opacity-80"
          style={{
            background: "oklch(0.135 0.008 50)",
            border: "1px solid oklch(0.22 0.009 52)",
            color: "oklch(0.94 0.005 68)",
          }}
          data-ocid="auth.button"
        >
          <Phone size={14} />
          Phone
        </button>
      </div>
    </>
  );
}
