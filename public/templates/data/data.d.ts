// Data json structure file v0.1.0
// @bryarrow

// a json template-data file is an instance of Data
export interface Data {
  author: AuthorInfo
  sections: Section[]
}

export interface PlainText {
  type: string
  value: string
}

export interface Link {
  type: string
  iconUrl: string | null
  linkUrl: string
  linkText: PlainText
}

export interface DatedBlock {
  type: string
  term: PlainText
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
  type: string
  iconUrl: string | null
  title: PlainText
  content: (PlainText | DatedBlock | Link)[]
}
