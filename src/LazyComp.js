import React, { memo, useEffect, useState } from 'react'

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(document.defaultView.scrollY)
  window.onscroll = () => setScrollY(document.defaultView.scrollY)

  return scrollY
}

export const LazyComp = memo(
  ({
    scrollY,
    distancePixelForLoad = 200,
    defaultComp: DefaultComp,
    compLoaded: CompLoaded,
    parentId,
    hideen = false,
    propsCompLoaded,
    propsCompDefault,
  }) => {
    const [load, setLoad] = useState(false)

    useEffect(() => {
      const el = document.getElementById(parentId)

      if ((!hideen && !load) || hideen) {
        setLoad(
          el.getBoundingClientRect().y < window.innerHeight + distancePixelForLoad &&
            el.getBoundingClientRect().y >= 0 - distancePixelForLoad
        )
      }
    }, [scrollY, hideen, load, distancePixelForLoad, parentId])

    if (!load && !DefaultComp) return null

    if (!load) return <DefaultComp {...propsCompDefault} />

    return <CompLoaded {...propsCompLoaded} />
  }
)
