import type { Metadata } from "next";
import SettingsForm from "@/layers/presentation/user/settings/form";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { getCurrentUserUseCase } from "@/layers/use-cases/user";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Settings() {
  const me = await getCurrentUserUseCase();

  return (
    <>
      <Heading>Settings</Heading>
      <Divider className="my-10 mt-6" />
      <SettingsForm {...me} />
    </>
  );
}
