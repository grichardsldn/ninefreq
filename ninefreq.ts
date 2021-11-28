import { writeFileSync } from 'fs'

const writeMaterial = ( 
  name: string, 
  red: number, 
  green: number,
  blue: number,
  dir: string,
  ) => {
    const output = `
newmtl ${name}
Ka ${red} ${green} ${blue} 
Kd ${red} ${green} ${blue} 
Ks ${red} ${green} ${blue}
Ns 100
Ni 1.000000 
d 1.000000 
illum 0 
`
    writeFileSync(`${dir}/${name}.mtl`, output)
  }

  writeMaterial("pink", 0.9, 0.8, 0.8, "output")