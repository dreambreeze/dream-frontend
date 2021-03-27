export default {
  setFrontendConfig(state, data) {
    state.frontendConfig = data
  },
  setHttpHeaders(state, data) {
    state.httpHeaders = data
  },
  setTenantId(state, data) {
    state.tenantId = data
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setToggleSideBarStatus(state, data) {
    state.toggleSideBarStatus = data
  },
  setFullScreenLoading(state, data) {
    state.fullScreenLoading = data
  },
}
