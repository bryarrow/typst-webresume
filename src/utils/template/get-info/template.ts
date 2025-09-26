import type Templates from '@/utils/template/templates-info/templates'

const templates: Templates = await (await fetch('/templates/templates.json')).json()

export function getAllTemplatesInfo() {
  return templates
}

export function getTemplateInfo(templateName: string) {
  if(templates.templates[templateName]!==undefined){
    return templates.templates[templateName];
  }else {
    throw new Error(`Template ${templateName} not found`);
  }
}
