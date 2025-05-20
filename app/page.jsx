import Header from "./_components/Header";
import TranslationPanel from "./_components/TranslationPanel";
import { getLanguagesAction } from "./_lib/actions";

async function TranslatePage() {
  const supportedLanguages = await getLanguagesAction();

  return (
    <>
      <Header />
      <TranslationPanel languages={supportedLanguages} />
    </>
  );
}

export default TranslatePage;
