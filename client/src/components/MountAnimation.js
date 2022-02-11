import { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"

export const MountAnimation = ({
  children,
  timeout = 600, // MATCH YOUR DEFAULT ANIMATION DURATION
  isVisible = false,
  unmountOnExit = true,
  classNames = "translate-y", // ADD YOUR DEFAULT ANIMATION
  ...restProps
}) => {
  const [isMounted, setIsMounted] = useState(isVisible)
  useEffect(() => setIsMounted(isVisible), [isVisible])
  return (
    <CSSTransition
      in={isMounted}
      timeout={timeout}
      classNames={classNames}
      unmountOnExit={unmountOnExit}
      {...restProps}
    >
      <>{children}</>
    </CSSTransition>
  )
}