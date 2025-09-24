# TOEIC Study - PWA + Supabase (Free)
아이폰/아이패드 동기화용 무료 템플릿입니다.

## 빠른 시작
1) Supabase 프로젝트 생성 → Project URL/anon key 확인
2) Supabase SQL Editor에 `sql/schema.sql` 실행
3) 환경변수 설정
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
4) 로컬
```
npm i
npm run dev
```
5) Vercel에 배포 → Safari에서 사이트 열고 '홈 화면에 추가'

## 사용
- / : 이메일 매직 링크 로그인
- /study/day/1 : 1일차 레슨
- /srs/words, /srs/sentences : SRS 복습

레슨 데이터는 `src/data/lessons.json`에서 수정하세요.
