// Page.tsx
'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginPageChecker from "@/utils/LoginPageChecker";

const Page: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in when component mounts
    if (localStorage.getItem("isLoggedIn")) {
      router.push("/"); // Redirect to home page if already logged in
    }
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const loginSuccess = LoginPageChecker(username, password); // Check login credentials
    if (loginSuccess) {
      localStorage.setItem("isLoggedIn", "true"); // Set isLoggedIn flag to true
      router.push("/"); // Redirect to home page upon successful login
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-[38px] bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your username and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input id="email" type="text" placeholder="" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={handlePasswordChange} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleLogin}>Login</Button>
            {error && <p className="text-red-500">Invalid username or password</p>}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
