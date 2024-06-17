"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

/* 서버 액션 함수 */
export const shareMeal = async (prevState, formData) => {
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

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.title) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    /* 하나라도 맞지 않으면 */
    return {
      message: "Invalid Input.",
    };
  }

  await saveMeal(meal);
  redirect("/meals");
};
