chrome.runtime.onMessage.addListener(function (message) {
  chrome.storage.sync.get(["resumeData"], function (result) {
    const resumes = Array.isArray(result.resumeData) ? result.resumeData : [];
    resumes.push(message);
    chrome.storage.sync.set({ resumeData: resumes });
  });
});
