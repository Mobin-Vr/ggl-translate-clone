import { auth } from "@clerk/nextjs/server";
import { getHistoryAction } from "../_lib/actions";
import NoPastTranslations from "./NoPastTranslations";
import TranslationList from "./TranslationList";

async function TranslationHistory() {
  const { userId } = await auth();
  const history = await getHistoryAction(userId);

  return (
    <div className="">
      <h1 className="my-5 text-3xl text-gray-600">History</h1>
      {history.length === 0 ? (
        <NoPastTranslations />
      ) : (
        <TranslationList history={history} />
      )}
    </div>
  );
}

export default TranslationHistory;
