import { signIn } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface SocialAuthProps {
  subtitle: string;
}

export function SocialAuth({ subtitle }: SocialAuthProps) {
  const handeLoginWithGoogle = async () => {
    await signIn("google", {
      callbackUrl: "/admin/tickets",
    });
  };

  const handeLoginWithGithub = async () => {
    await signIn("github", {
      callbackUrl: "/admin/tickets",
    });
  };

  return (
    <>
      <div className="my-6 flex items-center gap-4">
        <div className="border-app-gray-400 flex-1 border-t" />
        <span className="text-app-gray-400 text-sm whitespace-nowrap">
          {subtitle}
        </span>
        <div className="border-app-gray-400 flex-1 border-t" />
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="ghost" className="p-0" onClick={handeLoginWithGoogle}>
          <Avatar>
            <AvatarImage
              className="cursor-pointer"
              alt="Ícone do google"
              src="/google.svg"
            />
          </Avatar>
        </Button>
        <Button variant="ghost" className="p-0" onClick={handeLoginWithGithub}>
          <Avatar>
            <AvatarImage
              className="cursor-pointer"
              alt="Ícone do github"
              src="/github.svg"
            />
          </Avatar>
        </Button>
      </div>
    </>
  );
}
