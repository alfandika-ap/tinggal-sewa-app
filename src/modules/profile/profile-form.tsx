"use client"

import { Camera, Loader2 } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import useAuthStore from "@/store/auth-store"
import { useUpdateProfile } from "@/hooks/api-hooks/use-auth"
import CustomerService from "@/services/customer-service"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const profileFormSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: "Nama lengkap wajib diisi." })
    .max(50, { message: "Nama lengkap tidak boleh melebihi 50 karakter." }),
  username: z
    .string()
    .min(2, { message: "Username minimal 2 karakter." })
    .max(30, { message: "Username tidak boleh melebihi 30 karakter." }),
  email: z
    .string()
    .min(1, { message: "Email wajib diisi." })
    .email("Email tidak valid."),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter." })
    .optional()
    .or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProfileForm({ className, ...props }: ProfileFormProps) {
  const customer = useAuthStore((state) => state.customer)
  const setAuth = useAuthStore((state) => state.setAuth)
  const { mutate: updateProfile, isLoading } = useUpdateProfile()
  const [avatar, setAvatar] = React.useState<string>(`https://eu.ui-avatars.com/api/?name=${customer?.fullname}&size=50`)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullname: customer?.fullname || "",
      username: customer?.username || "",
      email: customer?.email || "",
      password: "",
    },
  })

  function onSubmit(data: ProfileFormValues) {
    toast.dismiss()
    
    // Only include password if it's not empty
    const updateData = {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      ...(data.password && data.password.trim() !== "" ? { password: data.password } : {}),
    }

    console.log("Submitting profile update with data:", updateData);

    updateProfile(updateData, {
      onSuccess: (updatedCustomer) => {
        console.log("Profile update successful:", updatedCustomer);
        // Update both the auth store and customer service
        setAuth(updatedCustomer);
        CustomerService.setCustomer(updatedCustomer);
        
        toast.success("Profil berhasil diperbarui");
        // Reset form with updated data
        form.reset({ 
          fullname: updatedCustomer.fullname,
          username: updatedCustomer.username,
          email: updatedCustomer.email,
          password: "" 
        });
      },
      onError: (error: any) => {
        console.error("Profile update error:", error);
        const errorData = error?.response?.data
        
        if (errorData && typeof errorData === 'object') {
          const hasValidationErrors = Object.keys(errorData).some(key => 
            Array.isArray(errorData[key]) && errorData[key].length > 0
          )
          
          if (hasValidationErrors) {
            Object.entries(errorData).forEach(([field, messages]) => {
              if (Array.isArray(messages) && messages.length > 0) {
                form.setError(field as any, { 
                  type: 'server', 
                  message: messages[0] as string 
                })
              }
            })
            
            toast.error("Gagal memperbarui profil, periksa form Anda")
          } else {
            const errorMessage = errorData?.message || errorData?.error || "Gagal memperbarui profil"
            toast.error(errorMessage)
          }
        } else {
          const errorMessage = error?.message || "Terjadi kesalahan saat memperbarui profil"
          toast.error(errorMessage)
        }
      }
    })
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={cn("grid gap-8", className)} {...props}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <Avatar className="h-24 w-24 cursor-pointer transition-transform hover:scale-105" onClick={handleAvatarClick}>
            <AvatarImage src={avatar} alt="Profile" />
            <AvatarFallback className="text-lg">{customer?.fullname?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div
            className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full cursor-pointer shadow-sm hover:bg-primary/90 transition-colors"
            onClick={handleAvatarClick}
          >
            <Camera className="h-4 w-4 text-white" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Foto Profil</h3>
          <p className="text-sm text-muted-foreground">
            Klik foto untuk mengubah avatar
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Ubah Password</h3>
              <p className="text-sm text-muted-foreground">
                Biarkan kosong jika tidak ingin mengubah password
              </p>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
} 