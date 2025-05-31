import { auth } from "@clerk/nextjs/server";
import TranslationHistory from "../_components/TranslationHistory";
import { getHistoryAction } from "../_lib/actions";

export default async function history() {
  const { userId } = await auth();
  const history = await getHistoryAction(userId);

  return <TranslationHistory history={history} />;
}
