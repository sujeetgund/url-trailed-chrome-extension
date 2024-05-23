chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  const para: HTMLElement = document.createElement("p");
  para.innerHTML = msg.data.data;
  document.body.appendChild(para);
  console.log(msg);
});
