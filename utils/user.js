export function getUserPath(user, customPath, paths) {
  if (customPath && user && customPath.id === user.activePathId) {
    return customPath;
  }
  if (!paths.list) return;
  const activePathId = user.activePathId;
  let userPath;
  paths.list.map((path) => {
    if (activePathId === path.id) {
      userPath = path;
    }
  });
  return userPath;
}
