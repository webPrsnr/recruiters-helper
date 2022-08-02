const nodeList = document.querySelector(".rc__check-list");
const push = document.querySelector("#rc__check");
const apiKey = document.querySelector(".rc__input");

const getData = () => {
  return new Promise((res, rej) => {
    chrome.storage.sync.get(["resumeData"], function (data) {
      res(data.resumeData);
    });
  });
};

const setData = (data) => {
  return new Promise((res, rej) => {
    res(chrome.storage.sync.set({ resumeData: data }));
  });
};

async function initMain() {
  const data = await getData();
  data.forEach((element) => {
    const div = createCustomElement("div", "rc__check-elem");

    const span = createCustomElement("span", "rc__check-title", element.tag);

    const p = createCustomElement("p", "rc__check-text", element.text);

    const btn = createCustomElement("button", "rc__check-btn", "delete");

    btn.addEventListener("click", async function () {
      const deletedElement = await deleteElement(element);
      if (deletedElement) div.remove();
    });

    div.append(span, p, btn);
    nodeList.append(div);
  });
}

async function deleteElement(element) {
  const data = await getData();
  const newData = data.filter((el) => el.tag !== element.tag);
  await setData(newData);
  return true;
}

push.addEventListener("click", async function (e) {
  const data = await getData();
  // TODO: send a request to the server
  console.log(apiKey.value);
  console.log(data);
});

function createCustomElement(elemTag, classTag, text) {
  const customElem = document.createElement(elemTag);
  customElem.classList.add(classTag);
  if (text) customElem.textContent = text;
  return customElem;
}

initMain();
