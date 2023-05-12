import ContourPlot from '@/components/plot/d3/ContourPlot';

const createDatapoint = () => ({
  x: Math.random() * 200 + 200,
  y: Math.random() * 200 + 80,
});

export default function Home() {
  return (
    <>
      <div className='flex flex-col gap-4 w-full max-w-prose'>
        <div className='h-96 w-full'>
          <ContourPlot
            data={Array.from({ length: 1000 }, () => createDatapoint())}
            dots={false}
          />
        </div>
        <div className='h-96 w-full'>
          <ContourPlot
            data={Array.from({ length: 1000 }, () => createDatapoint())}
            dots={false}
          />
        </div>
      </div>
    </>
  );
}
