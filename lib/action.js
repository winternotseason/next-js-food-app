"use server";

import { redirect } from "next/dist/server/api-utils";
import { saveMeal } from "./meals";

/* 서버 액션 함수 */
export const shareMeal = async (formData) => {
  /* 제출된 데이터 다루기 */
  const meal = {
    /* get(input 필드의 name) */
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image") /* file 일 것 */,
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  await saveMeal(meal);
  redirect('/meals');
};
