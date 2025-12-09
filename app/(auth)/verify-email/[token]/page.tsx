"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { verifyUserThunk } from "@/store/slices/authSlice";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type VerifyStatus = "idle" | "loading" | "success" | "error";

export default function Page() {
  const dispatch = useAppDispatch();
  const params = useParams<{ token: string }>();
  const token = params.token;

  const [status, setStatus] = useState<VerifyStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        setStatus("loading");

        await dispatch(verifyUserThunk({ token })).unwrap();

        setStatus("success");
        toast.success("Email verified successfully");
      } catch (error: any) {
        const message = (
          typeof error === "string"
            ? error
            : error?.message || "Email verification failed"
        ) as string;

        setErrorMessage(message);
        setStatus("error");
        toast.error(message);
      }
    };

    verifyEmail();
  }, [dispatch, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-semibold">
            {status === "success"
              ? "Email Verified"
              : status === "error"
                ? "Verification Failed"
                : "Verifying Email"}
          </CardTitle>
          <CardDescription>
            {status === "success" &&
              "Your email has been verified successfully. You can now log in to your account."}
            {status === "error" &&
              "We were unable to verify your email. The link may be invalid or expired."}
            {(status === "idle" || status === "loading") &&
              "Please wait while we verify your email. This will only take a moment."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {status === "loading" || status === "idle" ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  Verifying your email…
                </span>
              </div>
            ) : null}

            {status === "success" ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  Your email has been verified.
                </span>
              </div>
            ) : null}

            {status === "error" ? (
              <div className="flex flex-col items-center gap-2">
                <XCircle className="h-10 w-10" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">
                  {errorMessage}
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            {status === "success" && (
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
            )}

            {status === "error" && (
              <Button asChild variant="outline">
                <Link href="/register">Try Again</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
