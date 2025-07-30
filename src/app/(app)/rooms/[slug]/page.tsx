// REVIEWED

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
