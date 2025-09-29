import { $typst } from '@myriaddreamin/typst.ts'
import setTypst from '@/utils/typst-compiler/set-init-options.ts'

export default async function () {
  setTypst()
  await $typst.resetShadow()
}
