import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
const db = sql("meals.db");

export async function getMeals() {
  /* 로딩을 구현하기 위한 추가적인 지연 */
  await new Promise((res) => setTimeout(res, 2000));
  /* run() : 데이터를 주입시키거나 바꿀때
        all() : 모든 데이터를 가져올 때
        get() : 한 행을 가져올 때 */
  /* throw new Error("loading meals failed"); : 에러 페이지 구현 테스트 */
  return db.prepare("SELECT * FROM meals").all();
}

export async function getMeal(slug) {
  /* ?에 들어갈 변수를 get 함수의 인자로 */
  return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}

export async function saveMeal(meal) {
  console.log(meal)
  meal.slug = slugify(meal.title, { lower: true });
  /* 검열된 instructions 코드 */
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  /* 저장할 파일, 작업이 끝난 후 실행될 함수 */
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!!");
    }
  });

  /* DB에는 파일이 아닌 이미지 경로만 넣어줄 것이므로 meal.image를 교체해줌 */
  meal.image = `/images/${fileName}`;
  console.log(meal)
  /* @문법 순서 동일 주의 */
  db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug)
  `).run(meal);
}
