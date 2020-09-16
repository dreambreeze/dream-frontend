import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      showSideBar: 'showSideBar',
      locale: 'locale',
      userInfo: 'userInfo',
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      setShowSideBar: 'setShowSideBar',
      setLocale: 'setLocale',
      setUserInfo: 'setUserInfo',
    }),
    ...mapActions({}),
  },
}
