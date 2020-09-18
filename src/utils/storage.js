/**
 *
 *@author dream breeze
 *@date 2020/9/16 22:46
 */

function getHasLoginStorage() {
  return JSON.parse(sessionStorage.getItem('hasLogin'))
}

function setHasLoginStorage(hasLogin) {
  sessionStorage.setItem('hasLogin', JSON.stringify(hasLogin))
}

function getUserInfoStorage() {
  return JSON.parse(sessionStorage.getItem('userInfo'))
}

function setUserInfoStorage(userInfo) {
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
}

function getLocaleStorage() {
  return JSON.parse(localStorage.getItem('locale'))
}

function setLocaleStorage(locale) {
  localStorage.setItem('locale', JSON.stringify(locale))
}


export {
  getHasLoginStorage,
  setHasLoginStorage,
  getUserInfoStorage,
  setUserInfoStorage,
  getLocaleStorage,
  setLocaleStorage
}