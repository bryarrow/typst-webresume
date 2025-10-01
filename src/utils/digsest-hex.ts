export async function digestToHex(
  algorithm: string,
  data: ArrayBuffer | ArrayBufferView
): Promise<string> {
  // 计算哈希
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  // 以 Uint8Array 视图读取每个字节
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // 把每个字节转为两位十六进制，拼接起来
  // noinspection UnnecessaryLocalVariableJS: for code readable
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
