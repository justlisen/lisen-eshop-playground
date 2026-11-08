"use client";

import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type Props = {
  user?: { name?: string | null; image?: string | null } | null;
};

export function AuthButton({ user }: Props) {
  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-zinc-600 sm:block">
          {user.name?.split(" ")[0]}
        </span>
        <Link
          href="/api/auth/signout"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sign out</span>
        </Link>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className={buttonVariants({ variant: "ghost", size: "icon" })}
    >
      <User className="h-5 w-5" />
      <span className="sr-only">Sign in</span>
    </Link>
  );
}
