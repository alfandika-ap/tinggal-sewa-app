"use client"

import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLogin } from "@/hooks/api-hooks/use-auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const loginFormSchema = z.object({
  username: z.string().min(6, "Username minimal 6 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate()
  const { mutate: login, isLoading } = useLogin()
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(data: LoginFormValues) {
    toast.dismiss()
    
    login(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          toast.success("Login berhasil", {
            description: "Selamat datang kembali di Tinggal Sewa!"
          })
          navigate("/dashboard")
        },
        onError: (error: any) => {
          const errorMessage = error?.response?.data?.message || "Email atau password salah"
          toast.error("Gagal login", {
            description: errorMessage
          })
          form.setError("root", { 
            message: errorMessage
          })
        }
      }
    )
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    autoComplete="current-password"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <Button className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Sedang Login..." : "Login"}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Atau
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Belum punya akun?{" "}
        <Link to="/register" className="underline underline-offset-4 hover:text-primary">
          Daftar
        </Link>
      </div>
    </div>
  )
}
