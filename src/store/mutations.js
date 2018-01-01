const PROFILE = 'PROFILE'
const MENULIST = 'MENULIST'

export default {
	[PROFILE](state, payload) {
		state.profile = payload.profile;
	},
	[MENULIST](state, payload) {
		state.menuList = payload.menuList;
	},
}
