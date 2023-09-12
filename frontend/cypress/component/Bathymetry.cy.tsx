import Bathymetry from '@/app/(noscroll)/compose/Bathymetry';

describe('ExtensibleTable.cy.tsx', () => {
  beforeEach(() => {
    cy.mount(<Bathymetry ID='' />);
  });

  it('adds rows', () => {
    const rows = [{ x: 1, y: 2 }];

    cy.get('tbody').should('be.empty');
  });
});
