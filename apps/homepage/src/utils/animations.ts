export function unfoldAnimate(targetHeight: number, currentHeight: number, updateNextHeight: (nextHeight: number) => void, speed = 10) {
  const distance = targetHeight - currentHeight

  if (Math.abs(distance) < 1) {
    return targetHeight
  }

  const nextHeight = currentHeight + distance / speed

  updateNextHeight(nextHeight)
  requestAnimationFrame(() => { unfoldAnimate(targetHeight, nextHeight, updateNextHeight) })
}
