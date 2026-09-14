/*
 * @LastEditors: zhanghengxin ezreal.zhang@icewhale.org
 * @LastEditTime: 2022/12/1 下午8:21
 * @FilePath: /CasaOS-UI/src/router/index.js
 * @Description:
 *
 * Copyright (c) 2022 by IceWhale, All Rights Reserved.
 */

import Vue       from 'vue'
import VueRouter from 'vue-router'
import api       from '@/service/api'
import store     from '@/store'
import route     from './route.js'

Vue.use(VueRouter)

const routes = route

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err)
}

// logout() (src/service/service.js) navigates with router.replace(). When the
// guard redirects (e.g. to /login after token expiry), vue-router rejects the
// promise with a NavigationRedirected error — swallow it exactly like push()
// above, otherwise every token expiry logs an "Uncaught (in promise) ..." error.
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
	return originalReplace.call(this, location).catch((err) => err)
}

// Belt & braces: ignore navigation-level errors that are expected by design
// (redirects and duplicate navigations), surface anything else.
router.onError((err) => {
	const name = err && err.name
	if (name === 'NavigationRedirected' || name === 'NavigationDuplicated') {
		return
	}
	console.error('[router]', err)
})

const needInit = async () => {
	if (store.state.needInitialization) {
		return true
	}
	try {
		let userStatusRes = await api.users.getUserStatus();
		if (userStatusRes.data.success === 200 && !userStatusRes.data.data.initialized) {
			store.commit('SET_NEED_INITIALIZATION', true)
			store.commit('SET_INIT_KEY', userStatusRes.data.data.key)
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			return true
		} else {
			return false
		}
	} catch (error) {
		console.error(error)
		return false
	}
}


router.beforeEach(async (to, from, next) => {
	const accessToken = localStorage.getItem("access_token");
	const version = localStorage.getItem("version");
	const requireAuth = to.matched.some(record => record.meta.requireAuth);

	// 判断是否需要初始化
	let needInitRes = await needInit();

	// CRITICAL: always call next() EXACTLY once per guard run — the previous
	// code called next() a second time after next('/login') / next('/welcome')
	// in the /login and /logout branches, which made vue-router throw
	// "Redirected when going from ... via a navigation guard" as an uncaught
	// promise rejection every time a token expired or a logged-in user hit
	// /login. Every branch below returns immediately after deciding.
	if (to.path === '/welcome') {
		if (needInitRes) {
			return next();
		}
		return next("/login");
	}

	if (needInitRes) {
		return next('/welcome');
	}

	if (requireAuth && !accessToken) {
		return next('/login');
	}

	switch (to.path) {
		case "/login":
			if (accessToken) {
				return next('/');
			}
			break;

		case "/logout":
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			localStorage.removeItem("wallpaper");
			localStorage.removeItem("user");
			return next('/login');

		default:
			if (version == null) {
				localStorage.removeItem("access_token");
				return next('/login');
			}
			break;
	}
	return next();
});


export default router
