import MapBox from '@/components/MapBox';

export default async function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      <MapBox />
    </main>
  );
}
