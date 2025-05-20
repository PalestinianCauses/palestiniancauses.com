// REVIEWED

export const base64ToUint8Array = function base64ToUint8Array(
  base64String: string,
) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const dataRow = window.atob(base64);
  const outputArray = new Uint8Array(dataRow.length);

  for (let index = 0; index < dataRow.length; index += 1) {
    outputArray[index] = dataRow.charCodeAt(index);
  }

  return outputArray;
};
