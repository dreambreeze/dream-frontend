import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      showSideBar: 'showSideBar',
      locale: 'locale',
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      setShowSideBar: 'setShowSideBar',
      setLocale: 'setLocale',
    }),
    ...mapActions({}),
  },
}
