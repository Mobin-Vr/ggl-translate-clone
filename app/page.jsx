import TranslationForm from "./_components/TranslationForm";
import { getLanguages } from "./_lib/data-services";

export default async function page() {
  const supportedLangs = await getLanguages();

  return <TranslationForm supportedLangs={supportedLangs} />;
}
