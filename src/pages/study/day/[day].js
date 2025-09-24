// src/pages/study/day/[day].js
import lessonsData from '../../../data/lessons.json';
import Link from 'next/link';

export default function StudyDayPage({ day }) {
  const idx = Number(day) - 1;
  const order = lessonsData.order || [];
  const key = order[idx];
  const lesson = key ? lessonsData.lessons[key] : null;

  if (!lesson) {
    return (
      <div style={{ padding: 20 }}>
        <h2>해당 Day 데이터가 없습니다.</h2>
        <p>요청한 Day: {day}</p>
        <Link href="/">홈으로</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, lineHeight: 1.7 }}>
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
            <div style={{ margin: '6px 0 12px' }}>
              보기: {q.options.join(', ')} <br />
              정답: <b>{q.answer}</b> ({q.explain})
            </div>
          </li>
        ))}
      </ol>

      <nav style={{ marginTop: 24 }}>
        {idx > 0 && <Link href={`/study/day/${idx}`}>← 이전 Day</Link>}{' '}
        {idx < order.length - 1 && <Link href={`/study/day/${idx + 2}`}>다음 Day →</Link>}
      </nav>
    </div>
  );
}

// ✅ 정적 내보내기를 위해 Day 1~N의 경로를 미리 생성
export async function getStaticPaths() {
  const paths = (lessonsData.order || []).map((_, i) => ({
    params: { day: String(i + 1) },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { day: params.day } };
}
