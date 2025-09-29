export interface PlainText {
  type: 'plain-text'
  value: string
}

export interface Link {
  type: 'link'
  iconUrl: string | null
  linkUrl: string
  linkText: PlainText
}

export interface DatedBlock {
  type: 'dated-block'
  term: PlainText
  // you can add a _data: Date[] and a getter/setter to support Date as template-data
  data: PlainText
}

export interface AuthorInfo {
  authorName: PlainText
  photoUrl: string | null
  politicalStatus: PlainText | null
  contacts: { email: Link; phone: PlainText }
  otherInfos: Link[]
}

export interface Section {
  type: 'section'
  iconUrl: string | null
  title: PlainText
  content: (PlainText | DatedBlock | Link)[]
}

export interface Data {
  author: AuthorInfo
  sections: Section[]
}
