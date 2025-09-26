#import "template.typ": *
#import "data.typ": *

#show: project.with(
  title: name,
  author: author,
)

#header-line()

#self

#group((
  left-section(edu-title),
  edu,
  left-section[ Technical \ Skills ],
  tech,
  left-section[ Project \ Experience ],
  project-experience,
  left-section[ Activity \ Experience ],
  activity,
  left-section[ Hobbies \ and \ Interests ],
  hobbies,
))
