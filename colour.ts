import { writeFileSync } from 'fs'

export type RGB = [number, number, number]

export type Spectrum = [
  number, number, number, number, number, number, number, number, number
]

export const LOW_FILTER = [100,0,0, 100,0,0, 100,0,0] as Spectrum
export const MID_FILTER = [0,100,0, 0,100,0, 0,100,0] as Spectrum
export const HIGH_FILTER = [0,0,100, 0,0,100, 0,0,100] as Spectrum
export const ALL_FILTER = [100,100,100, 100,100,100, 100,100,100] as Spectrum

export const simpleRGB = (colour: Spectrum): RGB => {
  const s = colour
  return [
    (s[0] + s[1] + s[2]),
    (s[3] + s[4] + s[5]),
    ((s[6] + s[7] + s[8])),
  ]
}

export const filter = (colour: Spectrum, filter: Spectrum): Spectrum => {
  const range = [0,1,2,3,4,5,6,7,8]
  return range.map(n => colour[n] * (filter[n] / 100.0)) as Spectrum
}

export const writeMaterial = ( 
  name: string, 
  rgb: RGB,
  dir: string,
  ) => {
    const r = (rgb[0] / 100.0).toFixed(6) 
    const g = (rgb[1] / 100.0).toFixed(6)
    const b = (rgb[2] / 100.0).toFixed(6)
    const output = `
newmtl ${name}
Ka ${r} ${g} ${b} 
Kd ${r} ${g} ${b} 
Ks ${r} ${g} ${b}
Ns 100
Ni 1.000000 
d 1.000000 
illum 3 
`
  writeFileSync(`${dir}/${name}.mtl`, output)
}
