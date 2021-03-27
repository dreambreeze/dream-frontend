import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      hasLogin: 'hasLogin',
      defaultAvatar: 'defaultAvatar',
      logoUrl: 'logoUrl',
      randomSkyImg: 'randomSkyImg',
      showSideBar: 'showSideBar',
      showLoginModal: 'showLoginModal',
      locale: 'locale',
      userInfo: 'userInfo',
      sortList: 'sortList',
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      setHasLogin: 'setHasLogin',
      setShowSideBar: 'setShowSideBar',
      setShowLoginModal: 'setShowLoginModal',
      setLocale: 'setLocale',
      setUserInfo: 'setUserInfo',
      setSortList: 'setSortList',
    }),
    ...mapActions({
      getSortList: 'getSortList'
    }),
  },
}
