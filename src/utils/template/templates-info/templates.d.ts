interface TemplateInfo{
  path: string;
  repo: string;
}

export default interface Templates{
  version: string;
  templates: Record<string, TemplateInfo>;
}
