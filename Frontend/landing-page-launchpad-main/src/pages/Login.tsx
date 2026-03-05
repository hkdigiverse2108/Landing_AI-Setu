import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // login.tsx
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email || !password) return toast.error("Fill all fields");

  try {
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // send email
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access);
      localStorage.setItem("user", JSON.stringify({
        email,
        role: email === "admin@aisetu.com" ? "admin" : "user"
      }));

      toast.success("Login successful!");
      window.location.href = "/"; // redirect home
    } else {
      toast.error(data.detail || "Invalid credentials");
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error. Please try again.");
  }
};

  return (
    <>
      <Header />
      <main className="min-h-[80vh] flex items-center justify-center bg-background">
        <div className="w-full max-w-sm bg-card rounded-2xl p-8 shadow-card border border-border">
          <h1 className="text-center font-bold text-2xl mb-4">Login to AI-Setu ERP</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full bg-gold-gradient text-accent-foreground font-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;