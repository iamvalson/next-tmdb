import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "../actions";

export function LoginButton({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form action={login}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <Button type="submit" className="w-full">
        <LogIn aria-hidden="true" /> Continue with GitHub
      </Button>
    </form>
  );
}
