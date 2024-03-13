export default function bufferToHex(buffer) {
  return Array.from(buffer)
    .map((byte) => ('0' + (byte & 0xff).toString(16)).slice(-2))
    .join('');
}
