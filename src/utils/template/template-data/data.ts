import type * as DataType from './data-type.d.ts'

export class PlainText implements DataType.PlainText {
  type = 'plain-text'
  value: string
  constructor(text: string) {
    this.value = text
  }
}

export class Link implements DataType.Link {
  type = 'link'
  iconUrl: string | null = null
  linkUrl: string
  linkText: PlainText

  constructor(linkText: string, linkUrl: string, iconUrl?: string) {
    this.iconUrl = iconUrl ?? null
    this.linkUrl = linkUrl
    this.linkText = new PlainText(linkText)
  }
}

export class DatedBlock implements DataType.DatedBlock {
  type = 'dated-block'
  term = new PlainText('')
  private readonly _data: PlainText | Date[] = new PlainText('')
  get data(): PlainText {
    if (this._data instanceof PlainText) {
      return this._data
    } else {
      if (this._data[0] == this._data[1]) {
        return new PlainText(this._data[0].toDateString())
      } else {
        return new PlainText(this._data[0].toDateString() + '~' + this._data[1].toDateString())
      }
    }
  }

  constructor(term: PlainText, data: PlainText | Date[]) {
    this.term = term
    this._data = data
  }

  toJSON() {
    return {
      type: this.type,
      term: this.term,
      data: this.data,
    }
  }
}

export class Section implements DataType.Section {
  type = 'section'
  iconUrl: string | null = null
  title = new PlainText('')
  content: (PlainText | DatedBlock | Link)[] = [new PlainText('')]

  constructor(title: string, content: (PlainText | DatedBlock | Link)[], iconUrl?: string) {
    this.title = new PlainText(title)
    this.iconUrl = iconUrl?? null
    this.content = content
  }
}

class AuthorInfo implements DataType.AuthorInfo {
  authorName: PlainText
  photoUrl: string | null
  politicalStatus: PlainText | null
  contacts: {
    email: Link
    phone: PlainText
  }
  otherInfos: Link[]

  constructor(data?: Partial<AuthorInfo>) {
    this.authorName = new PlainText('Input Name')
    this.photoUrl = null
    this.politicalStatus = null
    this.contacts = {
      email: new Link('YourEmail', ''),
      phone: new PlainText('Phone number'),
    }
    this.otherInfos = [new Link('Other', '')]

    if (data) {
      Object.assign(this, data)
    }
  }
}

export class Data implements DataType.Data {
  author: AuthorInfo
  sections: Section[]
  constructor(author?: Partial<AuthorInfo>, sections?: Section[]) {
    this.author = new AuthorInfo(author)
    this.sections = sections ?? [new Section('Section',[new PlainText('*a section*')])]
  }
}
