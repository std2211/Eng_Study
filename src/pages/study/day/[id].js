import { useRouter } from 'next/router';
import lessonsData from '../../../data/lessons.json';

export default function StudyPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  const lessonKey = `day${id}_${Object.keys(lessonsData.lessons)[id-1]?.split('_')[1]}`;
  const lesson = lessonsData.lessons[`day${id}_${Object.keys(lessonsData.lessons)[id-1]?.split('_')[1]}`];

  if (!lesson) return <p>해당 Day 데이터가 없습니다.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{lesson.title}</h1>
      <h3>개념: {lesson.concept}</h3>

      <h4>예문</h4>
      <ul>
        {lesson.examples.map(([type, en, kr], idx) => (
          <li key={idx}>
            <b>{type}</b>: {en} → {kr}
          </li>
        ))}
      </ul>

      <h4>퀴즈</h4>
      <ul>
        {lesson.quiz.map((q, idx) => (
          <li key={idx}>
            {q.q} <br />
            보기: {q.options.join(', ')} <br />
            정답: <b>{q.answer}</b> ({q.explain})
          </li>
        ))}
      </ul>
    </div>
  );
}
