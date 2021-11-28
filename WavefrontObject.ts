import { writeFileSync } from 'fs'

export type Position = [number, number, number]

export const addPosition = (a: Position, b: Position): Position => {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2] ]
}

export const scalePosition = (a: Position, scale: number): Position => {
  return [a[0] * scale, a[1] * scale, a[2] * scale ]
}
type Face = {
  material: string,
  positions: number[],
}

export class WavefrontObject {
  private vertexes: Position[] = [] 
  private faces: Face[] = []
  private materials: string[] = []

  constructor() {
  }

  private pushMaterial(material: string): void {
    if (!this.materials.includes(material)) {
      this.materials.push(material)
    }
  }

  private pushVertex(position: Position): number {
    console.log(`pushing ${JSON.stringify([...position])}`)
    const offset = this.vertexes.length
    this.vertexes[offset] = [...position]
    return offset+1
  }

  public addTriangle(p1: Position, p2: Position, p3: Position, material: string): void {
    this.pushMaterial(material)
    const face: Face = {
      material,
      positions: [
        this.pushVertex(p1),
        this.pushVertex(p2),
        this.pushVertex(p3),
      ],
    }
    this.faces.push(face)
  }

  public addQuadrilateral(p1: Position, p2: Position, p3: Position, p4:Position, material: string): void {
    this.pushMaterial(material)
    const face: Face = {
      material,
      positions: [
        this.pushVertex(p1),
        this.pushVertex(p2),
        this.pushVertex(p3),
        this.pushVertex(p4),
      ],
    }
    this.faces.push(face)
  }

  public write(dir: string, name: string): void {
    const lines: string[] = []
    lines.push(`o ${name}`)
    lines.push(...this.vertexes.map(v => 
      `v ${v[0].toFixed(6)} ${v[2].toFixed(6)} ${v[1].toFixed(6)}`)) // dump in x,z,y for some reason`
    lines.push(`mtllib ${this.materials.map(m => `${m}.mtl`).join(' ')}`)
    lines.push(...(this.faces.flatMap(f => [
      `usemtl ${f.material}`,
      `f ${f.positions.join(' ')}`,
    ]
    )))
    lines.push(``)
    writeFileSync(`${dir}/${name}.obj`,  lines.join('\n')  )
    // console.log(JSON.stringify(this))
  }
}

