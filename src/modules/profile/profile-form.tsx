"use client"

import { Camera, Loader2 } from "lucide-react"
import * as React from "react"
import * as z from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

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
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProfileForm({ className, ...props }: ProfileFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [avatar, setAvatar] = React.useState<string>("https://scontent.fsub8-2.fna.fbcdn.net/v/t1.6435-9/57504316_1090054981198458_2262218480927375360_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHS2Q7voFwfFgP_uNPSGTgCvepTxr8aJEa96lPGvxokRsUuFSalCfw6WMOStMrgAwkS8PJlp6EVUyt3QGjf_r7E&_nc_ohc=iDEqJ24gc3QQ7kNvwHYSP7v&_nc_oc=AdkfMa_1tK13wzQvY-cmDVjoTDBtFU-9BhgWDnuzy6WXawozv3v9TlGirqfYsSMxr5g&_nc_zt=23&_nc_ht=scontent.fsub8-2.fna&_nc_gid=dqhZYjC8CIBp7SBcMNi4AQ&oh=00_AfK-0kx3uh8DZcqNlF8Tku1HThLxp07-PoKCmkt7atnKrg&oe=684825B7")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const defaultValues: Partial<ProfileFormValues> = {
    fullname: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
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
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20 cursor-pointer" onClick={handleAvatarClick}>
            <AvatarImage src={avatar} alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div
            className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer shadow-sm"
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

      <form onSubmit={onSubmit}>
        <div className="grid gap-4 max-w-md">
          <div className="grid gap-2">
            <Label htmlFor="fullname">Nama Lengkap</Label>
            <Input
              id="fullname"
              placeholder="Masukkan nama lengkap Anda"
              type="text"
              autoCapitalize="words"
              defaultValue={defaultValues.fullname}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Masukkan username Anda"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              defaultValue={defaultValues.username}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Masukkan email Anda"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              defaultValue={defaultValues.email}
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password Baru</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          <Button className="mt-2" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
} 