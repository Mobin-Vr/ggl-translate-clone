import { auth } from "@clerk/nextjs/server";
import TranslationHistory from "../_components/TranslationHistory";
import { getHistory } from "../_lib/data-services";

export default async function history() {
  const { userId } = await auth();

  if (!userId) return null;

  const history = await getHistory(userId);

  return <TranslationHistory history={history} />;
}
