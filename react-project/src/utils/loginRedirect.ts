export const getLoginRedirectPath = (loginPath: string) => {
  const currentUrl = window.location.pathname + window.location.search;

  if (currentUrl.includes('redirect=')) {
    return `${loginPath}${window.location.search}`;
  }

  const redirect = encodeURIComponent(currentUrl);
  return `${loginPath}?redirect=${redirect}`;
};
