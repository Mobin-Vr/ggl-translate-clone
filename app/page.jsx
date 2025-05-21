import Header from "./_components/Header";
import TranslationPanel from "./_components/TranslationPanel";
import { getLanguagesAction } from "./_lib/actions";

async function TranslatePage() {
  const supportedLangs = await getLanguagesAction();

  return (
    <div className="flex h-full flex-col">
      <Header />
      <TranslationPanel supportedLangs={supportedLangs} />
    </div>
  );
}

export default TranslatePage;
