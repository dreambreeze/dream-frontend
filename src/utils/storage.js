/**
 *
 *@author dream breeze
 *@date 2020/9/16 22:46
 */

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
  getUserInfoStorage,
  setUserInfoStorage,
  getLocaleStorage,
  setLocaleStorage
}