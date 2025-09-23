"use client";
import Button from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const session = useSession();
  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);
      if (session.status === "authenticated") {
        router.replace("/dashboard");
        return;
      }
      await signIn("google");
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Error in logging in";
      toast.error(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session.status]);
  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center">
      <div id="logo" className="w-fit mx-auto text-4xl font-bold font-sans">
        <span className="text-primary">ACE</span>
        <span className="text-white">CHATS</span>
      </div>
      <h1 className="text-2xl font-semibold font-sans mt-2">
        Sign in to your account
      </h1>
      <Button
        onClick={handleLogin}
        isLoading={isLoggingIn}
        className="w-64 sm:w-72 flex items-center rounded-2xl text-lg gap-2 mt-4"
      >
        <FaGoogle size={18} />
        <span>Continue with google</span>
      </Button>
    </div>
  );
}

export default LoginPage;
