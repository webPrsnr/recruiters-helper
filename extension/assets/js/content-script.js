const element = createCustomElement("div", "tooltip");

window.addEventListener("mouseup", function (e) {
  const selectedText = document.getSelection();
  const formatedText = selectedText.toString().trim();
  if (formatedText.length > 0) {
    initTooltipLabel(formatedText, e);
  }
});

window.addEventListener("mousedown", function (e) {
  if (element !== null) {
    element.remove();
  }
});

function initTooltipLabel(formatedText, e) {
  elementStyling(formatedText, e);
  const input = createInputForm(formatedText);
  element.append(input);
  document.body.appendChild(element);
  input.focus();
}

function elementStyling(text, event) {
  element.textContent = text;
  element.style.left = window.screen.width / 2 + "px";
  element.style.top = event.clientY + "px";
}

function createInputForm(text) {
  const input = createCustomElement("input", "tooltip__input");
  input.addEventListener("keydown", ({ key }) => {
    if (key === "Enter") {
      sendMessage(text, input.value);
      element.remove();
    }
  });
  return input;
}

function createCustomElement(elemTag, classTag) {
  const customElem = document.createElement(elemTag);
  customElem.classList.add(classTag);
  return customElem;
}

function sendMessage(text, inputValue) {
  if (text.length > 0 && inputValue.length > 0) {
    const message = {
      tag: inputValue,
      text: text,
    };
    chrome.runtime.sendMessage(message);
  }
}
