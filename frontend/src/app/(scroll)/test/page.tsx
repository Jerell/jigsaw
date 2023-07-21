import AutoTable from '@/components/table/AutoTable';

export default function Page() {
  return (
    <AutoTable
      data={[
        { a: 1, b: 2, c: 3 },
        { a: 40, b: 50, c: 60 },
        { a: 78.9, b: 12.3, c: 45.6 },
      ]}
      caption='test table'
    />
  );
}
