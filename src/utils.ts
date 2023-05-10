export const getMessages = (messageName: string, substitutions?: string | string[] | undefined) => {
  return chrome.i18n.getMessage(messageName, substitutions);
}