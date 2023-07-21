'use client';

import AutoTable from '@/components/table/AutoTable';
import { useState } from 'react';

export default function Page() {
  const [data, setData] = useState([
    { a: 1, b: 2, c: 3 },
    { a: 40, b: 50, c: 60 },
    { a: 78.9, b: 12.3, c: 45.6 },
  ]);

  return <AutoTable data={data} caption='test table' setter={setData} />;
}
