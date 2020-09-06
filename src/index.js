import './index.scss';

const set = new Set([1, 2, 3, 4, 4]);
console.log([...set]);
console.log('123');
// @dec
export default class A {
  render(...arg) {
    const { props } = this;
    console.log(...arg, props);
    return '';
  }
}

const ul = document.createElement('ul');
document.body.append(ul);

fetch('/api/users') // http://localhost:8080/api/users
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.login;
      ul.append(li);
    });
  });
