import { RegisterForm } from "@/modules/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Buat Akun Baru
      </h1>
      <p className="text-sm text-muted-foreground">
        Daftar sekarang dan mulai mencari hunian idamanmu
      </p>
      <RegisterForm className="mt-4" />
    </div>
  );
} 