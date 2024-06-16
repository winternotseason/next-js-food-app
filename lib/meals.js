import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  /* 로딩을 구현하기 위한 추가적인 지연 */
  await new Promise((res) => setTimeout(res, 2000));
  /* run() : 데이터를 주입시키거나 바꿀때
        all() : 모든 데이터를 가져올 때
        get() : 한 행을 가져올 때 */
  throw new Error("loading meals failed");
  return db.prepare("SELECT * FROM meals").all();
}