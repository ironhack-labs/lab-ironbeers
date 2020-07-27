const express = require('express');

const hbs = require('hbs');
const path = require('path');
const app = express();
//////////////////////////////////////
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// var hw = encrypt('23');
// console.log(hw);
// console.log(decrypt(hw));

///////////////////////////////////

////////=========================//////////
function myEncrypt(str) {
  var mykey = crypto.createCipher('aes-128-cbc', 'iron');
  var mystr = mykey.update(str, 'utf8', 'hex');
  mystr += mykey.final('hex');
  return mystr;
}

function myDecrypt(str) {
  var mykey = crypto.createDecipher('aes-128-cbc', 'iron');
  var mystr = mykey.update(str, 'hex', 'utf8');
  mystr += mykey.final('utf8');
  return mystr;
}

let num = 1;
let idStr = `${num}`;
let tag = myEncrypt(idStr);
console.log(tag);

console.log(parseInt(myDecrypt(tag), 10));

////////=========================//////////
app.listen(3000, () => console.log('🏃‍ on port 3000'));
