import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      hasLogin: 'hasLogin',
      showSideBar: 'showSideBar',
      showLoginModal: 'showLoginModal',
      locale: 'locale',
      userInfo: 'userInfo',
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
    }),
    ...mapActions({}),
  },
}
