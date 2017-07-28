import { JobsFrontPage } from './app.po';

describe('jobs-front App', () => {
  let page: JobsFrontPage;

  beforeEach(() => {
    page = new JobsFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
