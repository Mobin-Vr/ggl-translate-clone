import { toast } from "react-hot-toast";

export function showCustomToast(message) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex h-10 w-fit max-w-sm items-center justify-center rounded-lg bg-blue-100 p-3 shadow-lg`}
    >
      <p className="text-center text-sm font-medium text-blue-700">{message}</p>
    </div>
  ));
}
