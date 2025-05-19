import TranslationForm from "@/app/_components/TranslationForm";
import Header from "./_components/Header";
import HistoryIconLink from "./_components/HistoryIconLink";
import { getLanguagesAction } from "./_lib/actions";

async function TranslatePage() {
  const supportedLanguages = await getLanguagesAction();

  return (
    <>
      <Header />
      <div>
        <TranslationForm languages={supportedLanguages} />
        {/* History Button */}
        <HistoryIconLink />
      </div>
    </>
  );
}

export default TranslatePage;
