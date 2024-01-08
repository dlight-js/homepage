export interface Example {
  title: string
  zhTitle: string
  description: string
  zhDescription: string
  codeTitle: string
  code: string
  preview: any
}

export interface MusicItem {
  name: string
  link: string
  album: string
  picture: string
}

export const musics: MusicItem[] = [{
  name: "Happiness Is A Butterfly",
  picture: "https://lastfm.freetls.fastly.net/i/u/770x0/a7313de71c35e403f05d5b1ddabe1667.jpg#a7313de71c35e403f05d5b1ddabe1667",
  link: "https://www.youtube.com/watch?v=nbcXvlEa7Wk",
  album: "Norman Fucking Rockwell!"
}, {
  name: "Salvatore",
  picture: "https://lastfm.freetls.fastly.net/i/u/500x500/54a82b8d16b3e612a7ccd1684b4e2f65.jpg",
  link: "https://www.youtube.com/watch?v=GVQON-muEFc",
  album: "Honeymoon"
}, {
  name: "Sweet",
  picture: "https://lastfm.freetls.fastly.net/i/u/500x500/d997c7f2b282ddee62c10623a80b752d.jpg",
  link: "https://www.youtube.com/watch?v=-Fg-DcLJY4s",
  album: "Did you know that there's a tunnel under Ocean Blvd"
}, {
  name: "Black Bathing Suit",
  picture: "https://lastfm.freetls.fastly.net/i/u/500x500/68a5cc50ed4aad0786cecfc72dd78af3.jpg",
  link: "https://www.youtube.com/watch?v=vr8TN9Yhl4g",
  album: "Blue Banisters"
}, {
  name: "Cherry",
  picture: "https://lastfm.freetls.fastly.net/i/u/500x500/4ca041ff63553413cf62722ccc486246.jpg",
  link: "https://www.youtube.com/watch?v=uNuMH2i6wdI",
  album: "Lust for Life"
}, {
  name: "Tulsa Jesus Freak",
  picture: "https://lastfm.freetls.fastly.net/i/u/500x500/21143ab102d80288ecbd55a92a0f3fb0.jpg",
  link: "https://www.youtube.com/watch?v=pLiCh9PXbwg",
  album: "Chemtrails Over the Country Club"
}, {
  name: "West Coast",
  picture: "https://lastfm.freetls.fastly.net/i/u/500x500/97ae7fe956f2b5f316845fe7976fc4e0.jpg",
  link: "https://www.youtube.com/watch?v=oKxuiw3iMBE",
  album: "Ultraviolence"
}]
