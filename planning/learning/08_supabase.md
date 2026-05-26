# 08. Supabase 연동

## 개념

Supabase는 PostgreSQL 기반의 BaaS(Backend as a Service)야.
서버를 직접 만들지 않아도 DB, 인증, 스토리지를 바로 쓸 수 있어.

## 핵심 구조

```
.env                  ← URL + anon key (절대 git에 올리면 안 됨)
src/lib/supabase.js   ← createClient로 클라이언트 초기화
src/hooks/            ← Supabase 쿼리를 custom hook으로 분리
```

## 환경변수 설정

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

Vite에서는 `import.meta.env.VITE_변수명`으로 접근.
`VITE_` 접두사가 없으면 클라이언트에서 읽을 수 없음.

## Supabase 클라이언트

```js
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(url, key)
```

## 주요 쿼리 패턴

```js
// 전체 조회
const { data, error } = await supabase
  .from('books')
  .select('*')
  .order('created_at', { ascending: false })

// 단건 조회
const { data, error } = await supabase
  .from('books')
  .select('*')
  .eq('id', id)
  .single()

// 생성
const { error } = await supabase
  .from('books')
  .insert({ title, author, status, rating, memo })

// 수정
const { error } = await supabase
  .from('books')
  .update({ title, author, status, rating, memo })
  .eq('id', id)

// 삭제
const { error } = await supabase
  .from('books')
  .delete()
  .eq('id', id)
```

error가 있으면 throw, 없으면 data 사용.

## RLS (Row Level Security)

Supabase는 테이블 생성 시 RLS를 기본으로 활성화함.
정책(policy)이 없으면 모든 쿼리가 차단됨.

```sql
-- 인증 없이 전체 허용 (개발/학습용)
create policy "allow_select" on books for select using (true);
create policy "allow_insert" on books for insert with check (true);
create policy "allow_update" on books for update using (true) with check (true);
create policy "allow_delete" on books for delete using (true);
```

실서비스에서는 `auth.uid() = user_id` 같은 조건으로 본인 데이터만 접근하게 제한.

## 트러블슈팅

| 에러 | 원인 | 해결 |
|------|------|------|
| relation already exists | 테이블 중복 생성 | Table Editor에서 기존 테이블 확인 |
| row-level security policy | RLS 정책 없음 | policy 추가 |
| undefined (env 변수) | VITE_ 접두사 누락 | 변수명 앞에 VITE_ 붙이기 |
