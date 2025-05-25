import TranslationForm from "./_components/TranslationForm";
import { getLanguagesAction } from "./_lib/actions";

export default async function page() {
  const supportedLangs = await getLanguagesAction();

  return <TranslationForm supportedLangs={supportedLangs} />;
}
