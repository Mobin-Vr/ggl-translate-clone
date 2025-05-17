import TranslationForm from "@/app/_components/TranslationForm";
import Header from "./_components/Header";
import HistoryIconLink from "./_components/HistoryIconLink";
import { getLanguagesAction } from "./_lib/actions";

async function TranslatePage() {
  const supportedLanguages = await getLanguagesAction();

  return (
    <>
      <Header />
      <div className="mb-20 px-10 xl:px-0">
        <TranslationForm languages={supportedLanguages} />

        {/* History Button */}
        <HistoryIconLink />
      </div>
    </>
  );
}

export default TranslatePage;
