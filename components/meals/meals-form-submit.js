"use client";

import { useFormStatus } from "react-dom";

export default function MelasFormSubmit() {
  const { pending } = useFormStatus();
  
  /* disabled 속성에 pending을 넣어주어 form이 제출 중이라면 버튼을 비활성화 */
  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
