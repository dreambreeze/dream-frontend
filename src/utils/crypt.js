/**
 *
 *@Author dream breeze
 *@Date 2020/9/18 14:38
 */
import CryptoJS from 'crypto-js'

const cryptKey = process.env.VUE_APP_KEY;

export default {
  encrypt(data) {
    data = CryptoJS.MD5("copyright." + data + "dreambreeze@2020").toString();
    let key = CryptoJS.enc.Utf8.parse(cryptKey);
    let encrypted = CryptoJS.AES.encrypt(
      data,
      key,
      {
        iv: CryptoJS.enc.Utf8.parse(cryptKey),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },

  decrypt(data) {
    let base64 = CryptoJS.enc.Base64.parse(data);
    let src = CryptoJS.enc.Base64.stringify(base64);
    let key = CryptoJS.enc.Utf8.parse(cryptKey);
    let decrypt = CryptoJS.AES.decrypt(
      src,
      key,
      {
        iv: CryptoJS.enc.Utf8.parse(cryptKey),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}
