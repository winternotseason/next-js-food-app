import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";

export default function ShareMealPage() {
  /* 서버 액션 함수 */
  const shareMeal = async (formData) => {
    /* 함수 안에서의 use server : 오직 서버에서만 실행될 수 있게 보장 */
    "use server";
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
    console.log(meal);
  };
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMeal}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker lable="your image" name="image" />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
