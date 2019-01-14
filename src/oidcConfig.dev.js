const url = window.location.origin;

module.exports = {
  authority: '',
  client_id: '',
  client_secret:
  '',
  scope: 'openid modify_profile email profile',
  post_logout_redirect_uri: `${url}/#!logout`,
  redirect_uri: `${url}/#!callback`,
  silent_redirect_uri: `${url}/#!silent`,
};