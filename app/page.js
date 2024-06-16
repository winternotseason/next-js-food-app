import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>
        Time to get started!
        <p><Link href="/meals">음식들</Link></p>
        <p><Link href="/meals/share">음식 공유하기</Link></p>
        <p><Link href="/meals/pizza">피자</Link></p>
        <p><Link href="/meals/chicken">치킨</Link></p>
        <p><Link href="/community">Community</Link></p>
      </h1>
    </main>
  );
}
