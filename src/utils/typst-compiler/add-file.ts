import { typst } from '@/utils/typst-compiler/typst.ts'
import setTypst from '@/utils/typst-compiler/set-init-options.ts'

export async function addFileString(path: string, content: string) {
  setTypst()
  const encoder = new TextEncoder()
  try {
    await typst.mapShadow(path, encoder.encode(content))
    return
  } catch (error) {
    throw new Error(
      `Error when adding a string as file: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}

export async function addFileUrl(path: string, url: string) {
  setTypst()
  try {
    const file = new Uint8Array(await (await fetch(url)).arrayBuffer())
    await typst.mapShadow(path, file)
    return
  } catch (error) {
    throw new Error(
      `Error when adding a file: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
