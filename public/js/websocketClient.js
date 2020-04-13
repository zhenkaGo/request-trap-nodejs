/* eslint-disable */
const socket = new WebSocket('ws://localhost:3000');

const toUpperCase = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

socket.onmessage = (event) => {
  const data = JSON.parse(event.data, (k, v) => {
    if (v[0] === '{') {
      return JSON.parse(v);
    }
    return v;
  }).fullDocument;

  const element = document.createElement('li');
  const collapseHeader = document.createElement('div');
  collapseHeader.classList.add('collapsible-header');
  const span = document.createElement('span');
  span.innerHTML = `<span>${data._id}</span><strong>${new Date(data.createdAt).toUTCString()}</strong>`;
  collapseHeader.append(span);
  element.append(collapseHeader);

  const collapseBody = document.createElement('div');
  collapseBody.classList.add('collapsible-body');
  for (const item in data) {
    if (['__v', 'createdAt', '_id', 'trapId'].includes(item)) {
      continue;
    }

    if (data[item] instanceof Object) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${toUpperCase(item)}:`;
      collapseBody.append(p);

      const collection = document.createElement('ul');
      collection.classList.add('collection');
      for (const key in data[item]) {
        const collectionItem = document.createElement('li');
        collectionItem.classList.add('collection-item');
        const span = document.createElement('span');
        span.innerHTML = `<strong>${toUpperCase(key)}: </strong>${data[item][key]}`;
        collectionItem.append(span);
        collection.append(collectionItem);
      }
      collapseBody.append(collection);
      continue;
    }
    const p = document.createElement('p');
    p.innerHTML = `<strong>${toUpperCase(item)}: </strong>${data[item]}`;
    collapseBody.append(p);
  }
  element.append(collapseBody);

  const list = document.querySelector('.collapsible');
  list.prepend(element);
};
