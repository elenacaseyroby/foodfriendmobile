export function routeDeepLink(url, {navigate}) {
  // navigate function is extracted from this.props.navigation
  // and passed into this function.

  // basic url format: foodfriend://routeName/
  const route = url.replace(/.*?:\/\//g, '');
  const routeName = route.split('/')[0];

  // Routing to UpdatePassword component:
  // foodfriend://updatepassword/:id/:token
  if (routeName === 'updatepassword') {
    const userId = route.split('/')[1];
    const passwordResetToken = route.split('/')[2];
    navigate('UpdatePassword', {
      userId: userId,
      passwordResetToken: passwordResetToken,
    });
  }
}
