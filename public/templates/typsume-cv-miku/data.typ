#import "template.typ": *

#let authorJson = json("data.json").author
#let sectionsJson = json("data.json").sections

#let json-plain(json-data) = {
  if ((not ("type" in json-data)) or (json-data.type != "plain-text")) { panic("trying convert a non plain type") }
  return eval(json-data.value, mode: "markup")
}

#let json-link(json-data) = {
  if ((not ("type" in json-data)) or (json-data.type != "link")) { panic("trying convert a non link type") }
  return link(json-data.linkUrl)[
    #if (json-data.iconUrl != none) { icon(json-data.iconUrl) }
    #json-plain(json-data.linkText)
  ]
}

#let json-dated-block(json-data) = {
  if ((not ("type" in json-data)) or (json-data.type != "dated-block")) {
    panic("trying convert a non dated-block type")
  }
  return dated-subsection(json-plain(json-data.term), json-plain(json-data.data))
}

#let json-section(json-data) = {
  if ((not ("type" in json-data)) or (json-data.type != "section")) { panic("trying convert a non section type") }
  let section-content = []
  for p in json-data.content {
    if p.type == "plain-text" {
      section-content += json-plain(p)
    }
    if p.type == "link" {
      section-content += json-link(p)
    }
    if p.type == "dated-block" {
      section-content += json-dated-block(p)
    }
  }
  let icon-url = if json-data.iconUrl == none { "assets/icons/curl.svg" } else { json-data.iconUrl }
  return (icon-url, json-plain(json-data.title), section-content)
}


#let name = authorJson.authorName.value
#let political-status = if (authorJson.politicalStatus == none) {
  none
} else {
  json-plain(authorJson.politicalStatus)
}
#let profile-photo = if authorJson.photoUrl == none { none } else { image(authorJson.photoUrl,width: 22mm) }
#let email = [
  #if authorJson.contacts.email.iconUrl == none { icon("assets/icons/email.svg") }
  #json-link(authorJson.contacts.email)
]
#let phone = [
  #icon("assets/icons/phone.svg")
  #json-plain(authorJson.contacts.phone)
]

#let author = (
  name: name,
  profile-photo: profile-photo,
  political-status: political-status,
  contacts: (email, phone),
)

#for info-data in authorJson.otherInfos {
  author.insert(info-data.linkText.value, json-link(info-data))
}

#let sections = ()
#for section-json in sectionsJson {
  sections.push(json-section(section-json))
}
