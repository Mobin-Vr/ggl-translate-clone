import Spinner from "../_components/ui/Spinner";

export default function loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner className="-translate-y-full" />
    </div>
  );
}
