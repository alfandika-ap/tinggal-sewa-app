import { ProfileForm } from "@/modules/profile/profile-form"
import { Separator } from "@/components/ui/separator"

export default function ProfileSettingPage() {
  return (
    <div className="">
      <div className="w-full">
        <div className="px-4 py-2">
          <h1 className="text-md font-bold tracking-tight">Pengaturan Profil</h1>
          <p className="text-muted-foreground text-sm">
            Kelola informasi profil Anda.
          </p>
        </div>
        <Separator />
        <div className="px-4 py-4">
        <ProfileForm />
        </div>
      </div>
    </div>
  )
}
