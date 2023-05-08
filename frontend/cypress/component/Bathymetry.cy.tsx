import Bathymetry from '@/app/compose/Bathymetry';

describe('ExtensibleTable.cy.tsx', () => {
  beforeEach(() => {
    cy.mount(<Bathymetry />);
  });

  it('adds rows', () => {
    const rows = [{ x: 1, y: 2 }];

    cy.get('tbody').should('be.empty');
  });
});
