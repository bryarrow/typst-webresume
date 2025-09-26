#import "/template.typ": *
#import "/data.typ": *

#show: project.with(
  title: name,
  author: author,
)

#for sec in sections{
  section[ #title-emj(sec.at(0)) #sec.at(1) ]

  [#sec.at(2)]
}
