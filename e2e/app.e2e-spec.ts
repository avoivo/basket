import { EworkxPage } from './app.po';

describe('eworkx App', function() {
  let page: EworkxPage;

  beforeEach(() => {
    page = new EworkxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
