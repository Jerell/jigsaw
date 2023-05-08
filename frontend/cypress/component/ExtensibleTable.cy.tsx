import { ExtensibleTable } from '@/components/table/ExtensibleTable';
import { RowManager } from '@/components/table/RowManager';
import { useState } from 'react';

describe('ExtensibleTable.cy.tsx', () => {
  const [coords, setCoords] = useState<{ x: number; y: number }[]>([]);

  beforeEach(() => {
    setCoords([]);
    const rm = new RowManager(['x', 'y'], undefined, setCoords);
    cy.mount(
      <ExtensibleTable
        data={coords}
        caption={'extensible table'}
        rowManager={rm}
      />
    );

    it('adds rows', () => {});
  });
});
