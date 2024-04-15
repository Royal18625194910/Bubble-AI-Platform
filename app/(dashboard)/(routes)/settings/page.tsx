import { Settings } from "lucide-react";
import Heading from "@/components/custom/Heading";
import { SubscriptionButton } from "@/components/custom/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import {route} from "@/app/(dashboard)/(routes)/conversation/constants";

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  console.log(isPro);

  return (
    <div>
      <Heading
        title="Settings"
        desc="Manage account settings."
        icon={Settings}
        href='/settings'
        iconColor={route?.color as string}
        bgColor={route?.bgColor}
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro
            ? "You are currently on a Pro plan."
            : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default SettingsPage;
