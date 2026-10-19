import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "../actions";

export function SignOutButton() {
  return (
    <form action={logout}>
      <DropdownMenuItem
        nativeButton
        render={<button type="submit" className="w-full" />}
      >
        Sign out
      </DropdownMenuItem>
    </form>
  );
}
