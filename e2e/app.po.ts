import { browser, by, element } from 'protractor';

export class JobsFrontPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root p')).getText();
  }
}
