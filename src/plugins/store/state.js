export default () => {
  return Object.assign({
    tenantId: '',
    websiteCode: '',
    frontendConfig: {},
    httpHeaders: {
      'X-REQUEST-WITH': '',
      'X-XSRF-TOKEN': '',
    },
    userInfo: {},
    whitelistUrl: [],
    toggleSideBarStatus: false,
    sidebarData: [],
    fullScreenLoading: false,
  })
}
