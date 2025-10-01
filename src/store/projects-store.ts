import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { Data } from '@/utils/template/template-data/data.ts'
import type { TemplateInfo } from '@/utils/template/templates-info/templates'
import type TemplateMeta from '@/utils/template/templates-info/template'

import { typst } from '@/utils/typst-compiler/typst.ts'
import { addFileString } from '@/utils/typst-compiler/add-file.ts'
import { getTemplateInfo } from '@/utils/template/get-info/template.ts'
import { loadTemplate, loadWithDefault } from '@/utils/template/load/template.ts'
import * as localforage from 'localforage'
import { digestToHex } from '@/utils/digsest-hex.ts'

class ProjectData {
  name: string
  id: string
  template: string
  templateInfo: TemplateInfo
  data: Data | null
  // key in storge -- path
  photoRecords: Record<string, string>

  constructor(name: string, template: string, data?: Data | null, photos?: Record<string, string>) {
    this.name = name
    this.id = `${name}-r-${crypto.randomUUID()}`
    this.template = template
    this.templateInfo = getTemplateInfo(template)
    this.data = data ?? null
    this.photoRecords = photos ?? {}
  }
}

class Project {
  private _isLoad: boolean = false
  private _templateMeta!: TemplateMeta
  constructor(private dataRef: ProjectData) {}
  get data() {
    return this.dataRef.data
  }
  set data(value: Data | null) {
    this.dataRef.data = value
  }

  async load() {
    if (this._isLoad) return
    await typst.resetShadow()
    if (this.data === null) {
      const { templateMeta, data } = await loadWithDefault(this.dataRef.template)
      this.data = data
      this._templateMeta = templateMeta
    } else {
      const { templateMeta } = await loadTemplate(this.dataRef.template)
      this._templateMeta = templateMeta
      await addFileString('/data.json', JSON.stringify(this.data))
    }
    this._isLoad = true
  }

  async loadData() {
    await addFileString('/data.json', JSON.stringify(this.data))
  }

  async addPhoto(path: string, raw: Uint8Array): Promise<string> {
    const key = `${path}-p-${(await digestToHex('SHA-1', raw))}`
    if (!(await localforage.getItem(key))){
      await localforage.setItem(key, raw)
    }
    if (!(this.dataRef.photoRecords[key])){
      this.dataRef.photoRecords[key] = path
    }
    await this.loadPhotos()
    return key
  }

  async loadPhotos() {
    if (Object.keys(this.dataRef.photoRecords).length === 0) return
    for (const [key, path] of Object.entries(this.dataRef.photoRecords)) {
      const raw = await localforage.getItem(key)
      await typst.unmapShadow(path)
      await typst.mapShadow(path, raw as Uint8Array)
    }
  }

  async compileVector() {
    if (!this._isLoad) {
      await this.load()
    } else {
      await this.loadData()
    }
    await this.loadPhotos()
    return typst.vector({ mainFilePath: this._templateMeta.main })
  }

  async compilePDF() {
    if (!this._isLoad) {
      await this.load()
    } else {
      await this.loadData()
    }
    await this.loadPhotos()
    return typst.pdf({ mainFilePath: this._templateMeta.main })
  }
}

export const useProjectsStore = defineStore(
  'projects',
  () => {
    const activeProjectID = ref<string>()
    const openedProjectsID = ref<string[]>([])
    const allProjectsData = ref<Record<string, ProjectData>>({})

    const projectCache = new Map<string, Project>()
    const activeProject = computed<Project | undefined>(() => {
      const id = activeProjectID.value
      if (!id) return undefined
      const data = allProjectsData.value[id]
      if (!data) return undefined

      if (!projectCache.has(id)) {
        projectCache.set(id, new Project(data))
      }

      return projectCache.get(id)
    })

    function isActiveAndPrepared(id: string) {
      return activeProjectID.value === id && activeProject.value?.data != null
    }

    function addProject(name: string, template: string, data?: Data) {
      const newProjectData = new ProjectData(name, template, data)
      allProjectsData.value[newProjectData.id] = newProjectData
      return newProjectData.id
    }

    function removeProject(id: string) {
      if (openedProjectsID.value.includes(id)) {
        return false
      }
      projectCache.delete(id)
      return delete allProjectsData.value[id]
    }

    async function closeProject(id: string, switchTo?: string) {
      openedProjectsID.value = openedProjectsID.value.filter((item) => item !== id)
      if (activeProjectID.value === id) {
        if (switchTo) {
          await activateProject(switchTo)
        } else {
          console.warn('no switch to, set active to none')
          activeProjectID.value = undefined
        }
        return switchTo
      }
      return ''
    }

    async function openProject(id: string) {
      if (allProjectsData.value[id] === undefined)
        throw new Error(`Project with id ${id} not found`)
      if (!openedProjectsID.value.includes(id)) openedProjectsID.value.push(id)
    }
    async function activateProject(id: string): Promise<Project> {
      if (!openedProjectsID.value.includes(id)) await openProject(id)

      activeProjectID.value = id
      const project = activeProject.value
      if (!project) throw new Error(`Project with id ${id} not found`)

      await project.load()
      return project
    }

    return {
      // states
      activeProjectID,
      openedProjectsID,
      allProjectsData,
      // getters
      activeProject,
      // actions
      isActiveAndPrepared,
      addProject,
      removeProject,
      closeProject,
      activateProject,
    }
  },
  {
    persist: [
      {
        pick: ['activeProjectID', 'openedProjectsID'],
        storage: sessionStorage,
      },
      {
        pick: ['allProjectsData'],
        storage: localStorage,
      },
    ],
  },
)
