export function base64DecodeUtf8(base64: string) {
  // Base64에서 일반 ASCII로 디코딩
  const binaryString = atob(base64);

  // UTF-16 문자열로 변환
  const codeUnits = new Uint16Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i += 1) {
    codeUnits[i] = binaryString.charCodeAt(i);
  }

  // decodeURIComponent와 encodeURIComponent를 사용하여 UTF-8 문자열로 변환
  const uriComponent = Array.from(codeUnits)
    .map((byte) => `%${"00".concat(byte.toString(16)).slice(-2)}`)
    .join("");
  return decodeURIComponent(uriComponent);
}
