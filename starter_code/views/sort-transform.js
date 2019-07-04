//https://www.codewars.com/kata/sort-and-transform/train/javascript

function sortTransform(a) {
  const arr = [];
  for (let i = 0; i < a.length; i += 1) {
    arr.push(String.fromCharCode(a[i]));
  }
  const str1 = `${arr[0]}${arr[1]}${arr[arr.length - 2]}${arr[arr.length - 1]}`;
  arr.sort();
  const str2 = `${arr[0]}${arr[1]}${arr[arr.length - 2]}${arr[arr.length - 1]}`;
  arr.reverse();
  const str3 = `${arr[0]}${arr[1]}${arr[arr.length - 2]}${arr[arr.length - 1]}`;
  const str4 = str2;
  return `${str1}-${str2}-${str3}-${str4}`;
}
