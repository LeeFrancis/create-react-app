const acceptLanguage = require('accept-language');

const MAXAGE = new Date() * 0.001 + 365 * 24 * 3600; // eslint-disable-line no-magic-numbers

module.exports = locales => (req, res, next) => {
  const supportedLocales = locales || [{ code: 'en' }];
  if (req.originalUrl.match(/^(?!.*[js|other|assets]).*$/)) {
    acceptLanguage.languages(supportedLocales.map(lang => lang.code));
    if (req.cookies) {
      const cookieLocale = req.cookies.locale;
      const headerLocale = req.headers['accept-language'];
      const locale = acceptLanguage.get(cookieLocale || headerLocale) || 'en';
      res.cookie('locale', locale, { maxAge: MAXAGE });
    }
  }
  next();
};
