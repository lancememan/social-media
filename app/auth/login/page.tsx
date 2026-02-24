import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/forms/loginForm";

export default async function Login() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getClaims();
    
    if (data?.claims) {
        redirect("/");
    }
  
    return (
        <LoginForm redirectTo="/dashboard"/>
    )
}