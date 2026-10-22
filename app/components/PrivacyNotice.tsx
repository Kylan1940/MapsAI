import { ShieldCheck } from "lucide-react";

interface PrivacyNoticeProps {
  language: "id" | "en";
}

export default function PrivacyNotice({ language }: PrivacyNoticeProps) {
  return (
    <section className="mx-auto mt-4 max-w-180 px-5">
      <div
        role="note"
        className="flex items-start gap-2.5 rounded-2xl border border-[#0E4A34]/10 bg-[#F4FADC]/70 px-4 py-3 text-xs leading-5 text-[#3F5147]"
      >
        <ShieldCheck
          size={16}
          className="mt-0.5 shrink-0 text-[#0E4A34]"
          aria-hidden="true"
        />
        <p>
          {language === "id"
            ? "Seluruh informasi yang Anda masukkan tidak akan disimpan ke server. Kami tidak dapat melihat apa yang kalian tulis."
            : "Nothing you enter is saved to our server. We cannot see what you type."}
        </p>
      </div>
    </section>
  );
}