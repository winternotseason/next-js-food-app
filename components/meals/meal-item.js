import Link from "next/link";
import Image from "next/image";
import classes from "./meal-item.module.css";

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
            {/* assets 파일이 아닌 데이터베이스에서 이미지 불러오기, fill : 가능한 공간을 모두 채움 (이미지 크기를 사전에 알 수 없음) */}
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          {/* 특정 meal 페이지로 이동 */}
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
