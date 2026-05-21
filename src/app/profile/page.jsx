import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, User, Settings, Camera } from "lucide-react";
import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePage() {
  const { user } = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card className="shadow-xl border-muted-foreground/10">
        <CardHeader className="flex flex-col items-center gap-4 pb-8">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarImage src={user.image} />
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" /> {user.email}
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex justify-center border-t pt-8">
          <UpdateProfileModal currentUser={user} />
        </CardContent>
      </Card>
    </div>
  );
}
