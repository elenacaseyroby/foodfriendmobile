import asyncStorage from '../asyncStorage';

export async function routeDeepLink(url, {navigate}) {
  // navigate function is extracted from this.props.navigation
  // and passed into this function.

  // basic url format: foodfriend://routeName/
  const route = url.replace(/.*?:\/\//g, '');
  const routeName = route.split('/')[0];

  // Check if user is logged in & allow different routes based on that.
  const userId = await asyncStorage._retrieveData('USER_ID');
  const accessToken = await asyncStorage._retrieveData('ACCESS_TOKEN');
  const loggedIn = userId && accessToken;

  // logged in routing:
  if (loggedIn) {
    return;
    // loged out routing:
  } else {
    // Routing to UpdatePassword component:
    // foodfriend://updatepassword/:id/:token
    if (routeName === 'updatepassword') {
      const userId = route.split('/')[1];
      const passwordResetToken = route.split('/')[2];
      console.log(userId);
      console.log(passwordResetToken);
      navigate('Update Password', {
        userId: userId,
        passwordResetToken: passwordResetToken,
      });
    }
  }
}
