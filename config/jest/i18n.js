/**
 * Mocks for globals exposed by
 * @gctools-components/i18n-translation-webpack-plugin
 */

const localizer = function() {
  this.lang = 'en_CA';
  this.setLanguage = lang => this.lang = lang;
}

global.localizer = new localizer();

global.__ = str => `${global.localizer.lang}: ${str}`;
global.___ = global.__;
