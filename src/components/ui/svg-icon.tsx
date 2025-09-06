import type { TSvg } from "@/core/types/t-svg"
import { useState } from "react"

const SvgIcon = ({ icon, ...rest }: { icon: string }) => {
  const [svg, setSvg] = useState<TSvg>()
  import(`../../assets/svg/${icon}.tsx`).then((e: { svg: TSvg }) => setSvg(e.svg))
  return (
    <>
      {svg && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={svg.viewBox} width={svg.width} height={svg.height} {...rest}>
          {svg.path.map((p, i) => {
            return <path key={i} d={p} />
          })}
        </svg>
      )}
    </>
  )
}

export { SvgIcon }
