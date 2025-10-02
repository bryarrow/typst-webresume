import type * as DataType from './data-type.d.ts'

export class PlainText implements DataType.PlainText {
  readonly type = 'plain-text'
  value: string
  constructor(text: string) {
    this.value = text
  }
}

export class Link implements DataType.Link {
  readonly type = 'link'
  iconUrl: string | null
  linkUrl: string
  linkText: PlainText

  constructor(link?: Partial<DataType.Link>) {
    if (link?.type !== undefined && link?.type !== 'link')
      throw new Error(`You can’t use ${link.type} to construct the Link.`)

    this.iconUrl = null
    this.linkUrl = ''
    this.linkText = new PlainText('')

    if (link) Object.assign(this, link)
  }
}

export class DatedBlock implements DataType.DatedBlock {
  readonly type = 'dated-block'
  term: PlainText
  data: PlainText

  constructor(datedBlock?: Partial<DataType.DatedBlock>) {
    if (datedBlock?.type !== undefined && datedBlock?.type !== 'dated-block')
      throw new Error(`You can’t use ${datedBlock.type} to construct the Dated Block.`)

    this.term = datedBlock?.term ?? new PlainText('')
    this.data = datedBlock?.data ?? new PlainText('')
  }
}

export class Section implements DataType.Section {
  readonly type = 'section'
  iconUrl: string | null
  title: PlainText
  content: (PlainText | DatedBlock | Link)[]

  constructor(section?: Partial<DataType.Section>) {
    if (section?.type !== undefined && section?.type !== 'section')
      throw new Error(`You can’t use ${section.type} to construct the section.`)

    this.title = section?.title ?? new PlainText('')
    this.iconUrl = section?.iconUrl ?? null
    this.content = [new PlainText('')]

    if (section?.content) {
      this.content = []
      for (const item of section?.content) {
        if (item.type === 'link') {
          this.content.push(new Link(item))
        } else if (item.type === 'dated-block') {
          this.content.push(new DatedBlock(item))
        } else if (item.type === 'plain-text') {
          this.content.push(new PlainText(item.value))
        } else {
          throw new Error(`Unexpected content type, content: ${item}.`)
        }
      }
    }
  }
}

export class AuthorInfo implements DataType.AuthorInfo {
  authorName: PlainText
  photoUrl: string | null
  politicalStatus: PlainText | null
  contacts: {
    email: Link
    phone: PlainText
  }
  otherInfos: Link[]

  constructor(data?: Partial<DataType.AuthorInfo>) {
    this.authorName = new PlainText('Input Name')
    this.photoUrl = null
    this.politicalStatus = null
    this.contacts = {
      email: new Link({ linkText: new PlainText('YourEmail') }),
      phone: new PlainText('Phone number'),
    }
    this.otherInfos = [new Link({ linkText: new PlainText('Other') })]

    if (data) Object.assign(this, data)
  }
}

export class Data implements DataType.Data {
  author: AuthorInfo
  sections: Section[]
  constructor(author?: Partial<AuthorInfo>, sections?: Section[]) {
    this.author = new AuthorInfo(author)
    this.sections = [new Section()]
    if (sections) {
      this.sections = []
      for (const section of sections) {
        this.sections.push(new Section(section))
      }
    }
  }
}
