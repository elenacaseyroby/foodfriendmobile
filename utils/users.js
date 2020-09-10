// TODO: would be good to memoize this function.
export function getUserPath(user, customPath, paths) {
  if (customPath && user && customPath.id === user.activePathId) {
    return customPath;
  }
  if (!paths) return;
  const activePathId = user.activePathId;
  let userPath;
  paths.map((path) => {
    if (activePathId === path.id) {
      userPath = path;
    }
  });
  return userPath;
}
