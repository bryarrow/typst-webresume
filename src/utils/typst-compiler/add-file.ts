import { $typst } from '@myriaddreamin/typst.ts'

export async function addFileString(path: string, content: string) {
  const encoder = new TextEncoder()
  try {
    await $typst.mapShadow(path, encoder.encode(content))
    return
  } catch (error) {
    throw new Error(
      `Error when adding a string as file: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

export async function addFileUrl(path: string, url: string) {
  try {
    const file = new Uint8Array(await (await fetch(url)).arrayBuffer())
    await $typst.mapShadow(path, file)
    return
  } catch (error) {
    throw new Error(
      `Error when adding a file: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
