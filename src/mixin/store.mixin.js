import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      showSideBar: 'showSideBar',
      editorToolbars: 'editorToolbars',
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      setShowSideBar: 'setShowSideBar',
    }),
    ...mapActions({}),
  },
}
