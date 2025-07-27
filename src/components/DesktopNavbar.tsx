import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
  const user = await currentUser();
  // console.log(user)

  const profileSlug =
    user?.username ?? user?.emailAddresses?.[0]?.emailAddress?.split("@")[0];

  return (
    <div className="hidden md:flex items-center gap-4">
      <ModeToggle />

      <Button variant="ghost" asChild className="flex items-center gap-2">
        <Link href="/">
          <HomeIcon className="w-5 h-5" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" asChild className="flex items-center gap-2">
            <Link href="/notifications">
              <BellIcon className="w-5 h-5" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>

          <Button variant="ghost" asChild className="flex items-center gap-2">
            <Link href={`/profile/${profileSlug}`}>
              <UserIcon className="w-5 h-5" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>

          <UserButton afterSignOutUrl="/" />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
