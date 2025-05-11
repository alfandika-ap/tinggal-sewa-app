"use client"

import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRegister } from "@/hooks/api-hooks/use-auth"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const registerFormSchema = z.object({
  fullname: z.string().min(3, "Nama lengkap minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  phone: z.string().min(10, "Nomor telepon tidak valid"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
})

type RegisterFormValues = z.infer<typeof registerFormSchema>

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const navigate = useNavigate()
  const { mutate, isLoading } = useRegister()
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
  })

  function onSubmit(data: RegisterFormValues) {
    toast.dismiss();
    
    mutate(data, {
      onSuccess: () => {
        toast.success("Akun berhasil dibuat");
        navigate("/");
      },
      onError: (error: any) => {
        const errorData = error?.response?.data;
        
        if (errorData && typeof errorData === 'object') {
          const hasValidationErrors = Object.keys(errorData).some(key => 
            Array.isArray(errorData[key]) && errorData[key].length > 0
          );
          
          if (hasValidationErrors) {
            Object.entries(errorData).forEach(([field, messages]) => {
              if (Array.isArray(messages) && messages.length > 0) {
                form.setError(field as any, { 
                  type: 'server', 
                  message: messages[0] as string 
                });
              }
            });
            
            toast.error("Pendaftaran gagal, periksa form Anda");
          } else {
            // Generic error message fallback
            const errorMessage = error?.response?.data?.message || "Gagal membuat akun";
            toast.error(errorMessage);
          }
        } else {
          // Generic error message fallback
          const errorMessage = error?.response?.data?.message || "Gagal membuat akun";
          toast.error(errorMessage);
        }
      }
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama lengkap Anda"
                    autoCapitalize="words"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan username Anda"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan email Anda"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
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
                    autoComplete="new-password"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nomor telepon Anda"
                    type="tel"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Masukkan alamat Anda"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isLoading}>
            {isLoading ? "Membuat Akun..." : "Buat Akun"}
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
        Sudah punya akun?{" "}
        <Link to="/" className="underline underline-offset-4 hover:text-primary">
          Masuk Sekarang
        </Link>
      </div>
    </div>
  )
} 