import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      // Account exists - verify password
      if (existing.password !== pass) {
        setLoginError("Wrong password. Please try again.");
        return;
      }
      doLogin(existing.username);
      onLogin(existing.username);
    } else {
      // No account found - auto-create and log in
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
      style={{ background: "oklch(0.06 0.01 55)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.65 0.15 75 / 0.18) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <img
            src="/assets/generated/beatzflare-logo.dim_600x400.png"
            alt="BEATZFLARE"
            className="h-16 w-auto mx-auto mb-3"
          />
          <p
            className="text-xs tracking-[0.35em] uppercase font-semibold"
            style={{ color: "oklch(0.72 0.12 75)" }}
          >
            ESTD 2026
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Your Premium Music Experience
          </p>
        </div>

        <div
          className="rounded-2xl border p-8"
          style={{
            background: "oklch(0.10 0.012 55)",
            borderColor: "oklch(0.72 0.12 75 / 0.25)",
            boxShadow: "0 0 40px oklch(0.65 0.15 75 / 0.12)",
          }}
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList
              className="w-full mb-6"
              style={{
                background: "oklch(0.14 0.012 55)",
                borderRadius: "10px",
              }}
            >
              <TabsTrigger
                value="login"
                data-ocid="auth.tab"
                className="flex-1 data-[state=active]:text-primary data-[state=active]:font-semibold"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                data-ocid="auth.tab"
                className="flex-1 data-[state=active]:text-primary data-[state=active]:font-semibold"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-username"
                    className="text-foreground/80 text-xs uppercase tracking-wider"
                  >
                    Username
                  </Label>
                  <Input
                    id="login-username"
                    data-ocid="auth.input"
                    placeholder="Enter your username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    style={{
                      background: "oklch(0.14 0.012 55)",
                      borderColor: "oklch(0.72 0.12 75 / 0.2)",
                    }}
                    className="focus:border-primary placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="login-password"
                    className="text-foreground/80 text-xs uppercase tracking-wider"
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
                    style={{
                      background: "oklch(0.14 0.012 55)",
                      borderColor: "oklch(0.72 0.12 75 / 0.2)",
                    }}
                    className="focus:border-primary placeholder:text-muted-foreground/50"
                  />
                </div>
                {loginError && (
                  <p
                    data-ocid="auth.error_state"
                    className="text-sm"
                    style={{ color: "oklch(0.65 0.18 25)" }}
                  >
                    {loginError}
                  </p>
                )}
                <Button
                  type="submit"
                  data-ocid="auth.submit_button"
                  className="w-full font-semibold tracking-wide mt-2"
                  style={{
                    background: "oklch(0.72 0.14 75)",
                    color: "oklch(0.06 0.01 55)",
                  }}
                >
                  Login to BEATZFLARE
                </Button>
                <p
                  className="text-center text-xs mt-1"
                  style={{ color: "oklch(0.55 0.05 75)" }}
                >
                  First time? Just enter any username &amp; password to get in.
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="signup-username"
                    className="text-foreground/80 text-xs uppercase tracking-wider"
                  >
                    Username
                  </Label>
                  <Input
                    id="signup-username"
                    data-ocid="auth.input"
                    placeholder="Choose a username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    style={{
                      background: "oklch(0.14 0.012 55)",
                      borderColor: "oklch(0.72 0.12 75 / 0.2)",
                    }}
                    className="focus:border-primary placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="signup-password"
                    className="text-foreground/80 text-xs uppercase tracking-wider"
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
                    style={{
                      background: "oklch(0.14 0.012 55)",
                      borderColor: "oklch(0.72 0.12 75 / 0.2)",
                    }}
                    className="focus:border-primary placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="signup-confirm"
                    className="text-foreground/80 text-xs uppercase tracking-wider"
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
                    style={{
                      background: "oklch(0.14 0.012 55)",
                      borderColor: "oklch(0.72 0.12 75 / 0.2)",
                    }}
                    className="focus:border-primary placeholder:text-muted-foreground/50"
                  />
                </div>
                {signupError && (
                  <p
                    data-ocid="auth.error_state"
                    className="text-sm"
                    style={{ color: "oklch(0.65 0.18 25)" }}
                  >
                    {signupError}
                  </p>
                )}
                <Button
                  type="submit"
                  data-ocid="auth.submit_button"
                  className="w-full font-semibold tracking-wide mt-2"
                  style={{
                    background: "oklch(0.72 0.14 75)",
                    color: "oklch(0.06 0.01 55)",
                  }}
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-center text-xs text-muted-foreground/40 mt-6">
          Powered by MR. DINESH KUMAR CHAUDHARY
        </p>
      </motion.div>
    </motion.div>
  );
}
