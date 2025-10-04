// You may need to change this settings
#let sans-en = "KpSans"
#let sans-zh = "Source Han Sans SC"
#let serif-en = "KpRoman"
#let serif-zh = "Source Han Serif SC"
#let emj = "Segoe UI Emoji"

#let title-and-info-align = left

// You don't really need to change the content below
#let sans = (sans-en, sans-zh, emj)
#let serif = (serif-en, serif-zh, emj)
#let title-font = (serif-en, sans-zh, emj)

#let info(author) = {
  let (name,contacts,political-status,profile-photo,..other-info) = author
  let line-p-status = if political-status != none [ #author.political-status \ ] else []
  let line-contacts = for v in contacts { if v != none [#v ] else [] } + [\ ]
  let line-other-info = other-info.values().filter(x=>x!=none).join(" · ")

  align(title-and-info-align)[
    #line-p-status
    #line-contacts
    #line-other-info
  ]
}

#let project(title: "", author: (
  name: ""
), body) = {
  // Set the document's basic properties.
  set document(author: author.name, title: title)
  set page(
    numbering: "1 / 1",
    number-align: center,
    margin: (
      x: 0.7in,
      y: 0.5in
    )
  )
  set text(
    font: serif,
    lang: "en"
  )
  show math.equation: set text(weight: 400)

  let header-text = [
    // Title row.
    #align(title-and-info-align)[
      #block(
        text(
          font: title-font,
          weight: 700,
          1.75em,
          smallcaps(title)
        )
      )
    ]

    // Author information.
    #pad(
      top: 0.5em,
      bottom: 0.5em,
      // x: 2em,
      info(author)
    )
  ]

  if author.profile-photo != none [
    #stack(
    dir: ltr,
    spacing: 1fr,
    align(bottom)[#header-text],
    align(bottom)[#author.profile-photo]
  )]else[
    #header-text
  ]

  // Main body.
  set par(justify: true)

  body
}

#let icon(name, baseline: 1.5pt) = {
  box(
    baseline: baseline,
    height: 10pt,
    image(name)
  )
}

#let title-emj(name, baseline: 1.5pt) = {
  box(
    baseline: baseline,
    height: 16pt,
    image(name)
  )
}

#let header-line() = {v(-3pt); line(length: 100%); v(-5pt)}

#let section(term) = {
  show heading.where(
    level: 1
  ): it => block(width: 100%)[
    #set text(
      font: sans,
      weight: "regular",
    )
    #smallcaps(it.body)
  ]

  [ = #term ]

  header-line()
}

#let dated-subsection(term, data) = {
  grid(
    columns: (1fr, auto),
    align(left)[ #term ],
    align(right)[ #data ],
  )
}

#let left-section(term) = [
  #show heading.where(
    level: 1
  ): it => block(width: 100%)[
    #set text(
      font: sans,
      weight: "regular"
    )
    #smallcaps(it.body)
  ]

  = #term
]

#let group(terms) = {
  v(1.35em)

  grid(
    columns: (2fr, 8fr),
    column-gutter: 2em,
    row-gutter: 2em,
    ..terms
  )
}
