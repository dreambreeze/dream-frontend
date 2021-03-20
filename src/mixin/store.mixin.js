import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      hasLogin: 'hasLogin',
      showSideBar: 'showSideBar',
      showLoginModal: 'showLoginModal',
      locale: 'locale',
      userInfo: 'userInfo',
      sortList: 'sortList',
      departments: 'departments',
    }),
    ...mapGetters({
      departmentList: 'departmentList',
      departmentParentList: 'departmentParentList',
    }),
  },
  methods: {
    ...mapMutations({
      setHasLogin: 'setHasLogin',
      setShowSideBar: 'setShowSideBar',
      setShowLoginModal: 'setShowLoginModal',
      setLocale: 'setLocale',
      setUserInfo: 'setUserInfo',
      setSortList: 'setSortList',
      saveDepartment: 'saveDepartment',
      setDepartments: 'setDepartments',
      deleteDepartments: 'deleteDepartments',
    }),
    ...mapActions({
      getSortList: 'getSortList'
    }),
  },
}
