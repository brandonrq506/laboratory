const API_RESPONSE_TIME = 2000;

export function sendMessage(text: string) {
  return new Promise((resolve) => {
    setTimeout(resolve, API_RESPONSE_TIME);
  });
}
