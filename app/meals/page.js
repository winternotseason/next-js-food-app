import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import Link from "next/link";
import { Suspense } from "react";
import classes from "./page.module.css";

/* 데이터를 가져오는 부분을 아웃소싱 */
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

const MealPage = () => {
  /* useEffect => fetch() : 일반적인 리액트 클라이언트 컴포넌트에서 데이터를 불러오는 방법 */

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Chooses your favorite recipe</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* Suspense 컴포넌트로 로딩 구현 */}
        <Suspense
          fallback={<p className={classes.loading}>Fetching data...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealPage;
