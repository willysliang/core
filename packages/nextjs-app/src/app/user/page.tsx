import { getItem } from './utils';

export default async function Home() {
  const data = await getItem();
  return (
    <article>
      {data.map((o) => (
        <div key={o.id}>{o.name}</div>
      ))}
    </article>
  );
}
