import { writeFileSync } from 'fs'

export type RGB = {
  red: number,
  green: number,
  blue: number,
}

export type Spectrum = number[]

export const simpleRGB = (colour: Spectrum): RGB => {
  const s = colour
  return {
    red: (s[0] + s[1] + s[2]) / 3.0,
    green: (s[3] + s[4] + s[5]) / 3.0,
    blue: ((s[6] + s[7] + s[8]) / 3.0),
  }
}

export const filterRGB = (colour: Spectrum, filter: Spectrum) => {
  const range = [0,1,2,3,4,5,6,7,8]
  return range.map(n => colour[n] * (filter[n] / 100.0))
}

export const writeMaterial = ( 
  name: string, 
  rgb: RGB,
  dir: string,
  ) => {
    const r = (rgb.red / 100.0).toFixed(6) 
    const g = (rgb.green / 100.0).toFixed(6)
    const b = (rgb.blue / 100.0).toFixed(6)
    const output = `
newmtl ${name}
Ka ${r} ${g} ${b} 
Kd ${r} ${g} ${b} 
Ks ${r} ${g} ${b}
Ns 100
Ni 1.000000 
d 1.000000 
illum 0 
`
  writeFileSync(`${dir}/${name}.mtl`, output)
}

const pink = [90,90,90,80,80,80,80,80,80]

writeMaterial("pink", simpleRGB(pink), "output")