import { SocialLoginAppPage } from './app.po';

describe('social-login-app App', () => {
  let page: SocialLoginAppPage;

  beforeEach(() => {
    page = new SocialLoginAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
