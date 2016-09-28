import { HohcsClientPage } from './app.po';

describe('hohcs-client App', function() {
  let page: HohcsClientPage;

  beforeEach(() => {
    page = new HohcsClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
