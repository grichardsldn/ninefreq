import { writeFileSync } from 'fs'

const writeMaterial = ( 
  name: string, 
  red: number, 
  green: number,
  blue: number,
  dir: string,
  ) => {
    const r = red.toFixed(6)
    const g = green.toFixed(6)
    const b = blue.toFixed(6)
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

  writeMaterial("pink", 0.9, 0.8, 0.8, "output")