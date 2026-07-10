import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { signup } from "@/services/auth.service";

export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await signup({ email, password, fullName });
      if (data.status !== 200) return setError(data.msg);
      navigate("/auth/login");
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
              <h1 className="text-2xl font-bold">Create account</h1>
              <p className="text-sm text-muted-foreground">Fill in the form below to create your account</p>
            </div>

            {error && <p className="text-center text-sm text-red-500">{error}</p>}

            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </Field>

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
              <FieldDescription>We'll use this to contact you.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <FieldDescription>Must be at least 6 characters long.</FieldDescription>
            </Field>

            <Button type="submit">Sign up</Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </FieldGroup>
        </form>
      </div>

      <div className="hidden bg-muted md:block" />
    </div>
  );
}
