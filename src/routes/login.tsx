import { LoginForm } from "@/modules/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Masuk ke Akunmu
      </h1>
      <p className="text-sm text-muted-foreground">
        Masukkan username dan password untuk melanjutkan
      </p>
      <LoginForm className="mt-4" />
    </div>
  );
} 