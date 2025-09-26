import { join } from '@fireflysemantics/join'
import { addFileString, addFileUrl } from '@/utils/typst-compiler/add-file.ts'
import { getTemplateInfo } from '@/utils/template/get-info/template.ts'

import type TemplateMeta from '@/utils/template/templates-info/template'

export async function loadTemplate(templateName: string) {
  const templatePath = join('/templates/', getTemplateInfo(templateName).path)
  const templateJsonPath = join(templatePath, 'template.json')
  const templateMeta: TemplateMeta = await (await fetch(templateJsonPath)).json()
  await addFileUrl(templateMeta.main, join(templatePath, templateMeta.main))
  await addFileUrl(templateMeta.style, join(templatePath, templateMeta.style))
  await addFileUrl(templateMeta.data, join(templatePath, templateMeta.data))
  for (const icon of templateMeta.icons) {
    await addFileUrl(icon, join(templatePath, icon))
  }
  for (const file of templateMeta.otherFiles) {
    await addFileUrl(file, join(templatePath, file))
  }
  return { templatePath, templateMeta }
}

export async function loadWithDefault(templateName: string) {
  const { templatePath, templateMeta } = await loadTemplate(templateName)
  if (templateMeta.dataDefault !== '') {
    await addFileUrl('/data.json', join(templatePath, templateMeta.dataDefault))
  } else {
    const defaultData = await import('@/utils/template/template-data/data.ts')
    await addFileString('/data.json', JSON.stringify(new defaultData.Data()))
  }
  return { templatePath, templateMeta }
}
