import PostTextButton from "@/components/PostText";
import ProtectedApiButton from "@/components/ProtectedApiButton";
import SubscribeComponent from "@/components/subscribe";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        {/* <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div> */}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Protected API Access</h2>
        <ProtectedApiButton />
      </div>
      <div>
        <h3>Here</h3>
        <PostTextButton />
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <SubscribeComponent
          priceId="price_1QZ662GJZvKYlo2C0123456789"
          price="10"
          description="Subscribe to the newsletter"
        />
      </div>
    </div>
  );
}
