export function observe(el: HTMLElement, styleKeyMap: Record<string, string>) {
  const callback = () => {
    for (const [key, value] of Object.entries(styleKeyMap)) {
      if (!(value in this)) continue
      console.log(getComputedStyle(el).getPropertyValue(key))
      this[value] = getComputedStyle(el).getPropertyValue(key)
    }
  }
  callback()
  const observer = new MutationObserver(callback)

  observer.observe(el, {
    attributes: true
  })
}

export function observeWidth(el: HTMLElement, name = "width") {
  const callback = () => {
    this[name] = el.getBoundingClientRect().width
  }
  callback()
  const observer = new MutationObserver(callback)

  observer.observe(el, { attributes: true, childList: true, subtree: true })
}
