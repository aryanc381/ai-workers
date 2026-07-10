import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { login } from "@/services/auth.service";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ email, password });
      if (data.status !== 200) return setError(data.msg);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Sign in</h1>
              <p className="text-sm text-muted-foreground">Enter your email below to sign in</p>
            </div>

            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            <Button type="submit">Sign in</Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </p>
          </FieldGroup>
        </form>
      </div>

      <div className="hidden bg-muted md:block" />
    </div>
  );
}
