import { auth } from "@clerk/nextjs/server";
import TranslationForm from "./_components/TranslationForm";
import { getLanguages, getRecentHistory } from "./_lib/data-services";

export default async function page() {
  const { userId } = await auth();

  const supportedLangs = await getLanguages();
  const recentHistory = await getRecentHistory(userId);

  return (
    <TranslationForm
      supportedLangs={supportedLangs}
      recentHistory={recentHistory}
    />
  );
}
