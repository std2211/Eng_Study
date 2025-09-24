// src/pages/study/day/[day].js
import { useRouter } from 'next/router';
import lessonsData from '../../../data/lessons.json';
import Link from 'next/link';

export default function StudyDayPage() {
  const router = useRouter();
  const { day } = router.query; // /study/day/1 -> day = "1"

  if (!day) return <p style={{padding:20}}>Loading...</p>;

  // lessons.json의 order 배열을 기준으로 day 번호를 key로 매핑
  const idx = Number(day) - 1;
  const order = lessonsData.order || [];
  const lessonKey = order[idx];
  const lesson = lessonKey ? lessonsData.lessons[lessonKey] : null;

  if (!lesson) {
    return (
      <div style={{padding:20}}>
        <h2>해당 Day 데이터가 없습니다.</h2>
        <p>요청한 Day: {day}</p>
        <Link href="/">홈으로</Link>
      </div>
    );
  }

  return (
    <div style={{padding:20, lineHeight:1.7}}>
      <h1>{lesson.title}</h1>
      <h3>개념</h3>
      <p>{lesson.concept}</p>

      <h3>예문</h3>
      <ul>
        {lesson.examples.map(([tag, en, ko], i) => (
          <li key={i}>
            <b>[{tag}]</b> {en} — {ko}
          </li>
        ))}
      </ul>

      <h3>퀴즈(정답은 굵게)</h3>
      <ol>
        {lesson.quiz.map((q, i) => (
          <li key={i}>
            {q.q}
            <div style={{marginTop:6, marginBottom:12}}>
              보기: {q.options.join(', ')} <br/>
              정답: <b>{q.answer}</b> ({q.explain})
            </div>
          </li>
        ))}
      </ol>

      <nav style={{marginTop:24}}>
        {idx > 0 && <Link href={`/study/day/${idx}`}>← 이전 Day</Link>}{' '}
        {idx < order.length - 1 && <Link href={`/study/day/${idx+2}`}>다음 Day →</Link>}
      </nav>
    </div>
  );
}
