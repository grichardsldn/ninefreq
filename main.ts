import * as colour from "./colour"

import { WavefrontObject, Position, addPosition, scalePosition } from './WavefrontObject'

const pseudoRandom = require('pseudo-random');
const prng = pseudoRandom(12021990);


const filter = colour.ALL_FILTER

const block: Position[][] = [
  [[0,0,0],[3,0,0],[3,5,0],[0,5,0]], // base
  [[0,0,0],[3,0,0],[3,0,3],[0,0,21]], // front
  [[0,0,0],[0,5,0],[0,5,3],[0,0,21]], //left
  [[0,5,0],[3,5,0],[3,5,3],[0,0,21]], // back
  [[3,0,0],[3,5,0],[3,5,0],[0,0,21]], // right
]

const panel: Position[][] = [
  [[0,0,0],[0,21,0],[0,21,89],[0,0,89]],
]

const lid: Position[][] = [
  [[0,0,89],[200,0,89],[200,200,89],[0,200,89]],
]

const floor: Position[][] = [
  [[0,0,0],[200,0,0],[200,200,0],[0,200,0]],
]

const drawBlock = (
  template: Position[][],
  o: WavefrontObject,
  unitSize: number,
  origin: Position,
  xCell: number,
  yCell: number,
  material: string,
):void => {
  const unit = [unitSize, unitSize, unitSize]

  const startPos: Position = [
    origin[0] + (xCell * unitSize * 5),
    origin[1] + (yCell * unitSize * 8),
    origin[2],
  ]
  template.forEach(q => {
    o.addQuadrilateral(
      addPosition(scalePosition(q[0], unitSize),startPos),
      addPosition(scalePosition(q[1], unitSize),startPos),
      addPosition(scalePosition(q[2], unitSize),startPos),
      addPosition(scalePosition(q[3], unitSize),startPos),
      material)
  })
}

const draw = (
  o: WavefrontObject,
  unitSize: number,
  origin: Position,
  xCell: number,
  yCell: number,
  material: string,
):void => {
  const unit = [unitSize, unitSize, unitSize]

  const startPos: Position = [
    origin[0] + (xCell * unitSize * 5),
    origin[1] + (yCell * unitSize * 8),
    origin[2],
  ]
  block.forEach(q => {
    o.addQuadrilateral(
      addPosition(scalePosition(q[0], unitSize),startPos),
      addPosition(scalePosition(q[1], unitSize),startPos),
      addPosition(scalePosition(q[2], unitSize),startPos),
      addPosition(scalePosition(q[3], unitSize),startPos),
      material)
  })
  
}

const pink = [90,90,90, 20,20,20, 20,20, 20] as colour.Spectrum
colour.writeMaterial("pink", colour.simpleRGB(colour.filter(pink, filter)), "output")

const o = new WavefrontObject()
const origin = [-1,-1,-1] as Position

const randomLevel = () => Math.floor((prng.random() * 66))
for (let c = 0; c < 9; c++) {
  const name = `random-c${c}`
  let spectrum = [...Array(9)] as colour.Spectrum
  spectrum = spectrum.map(v => randomLevel()) as colour.Spectrum
  colour.writeMaterial(name, colour.simpleRGB(colour.filter(spectrum, filter)), "output")
  drawBlock(block, o, 0.1, origin ,c,-1, name)
}

for (let c = 0; c < 9; c++) {
  const name = `random-a${c}`
  let spectrum = [...Array(9)] as colour.Spectrum
  spectrum = spectrum.map(v => randomLevel()) as colour.Spectrum
  colour.writeMaterial(name, colour.simpleRGB(colour.filter(spectrum, filter)), "output")
  drawBlock(block,o, 0.1, origin ,c,0, name)
}

for (let c = 0; c < 9; c++) {
  const name = `thin_${c}`;
  const spectrum = [0,0,0,0,0,0,0,0,0] as colour.Spectrum
  spectrum[c] = 100
  colour.writeMaterial(name, colour.simpleRGB(colour.filter(spectrum, filter)), "output")
  drawBlock(block, o, 0.1, origin ,c,1, name)
}

for (let c = 0; c < 9; c++) {
  const name = `wide_${c}`;
  const spectrum = [0,0,0,0,0,0,0,0,0] as colour.Spectrum
  spectrum[c] = 34
  spectrum[(c-1)%9] = 33
  spectrum[(c+1)%9] = 33
  colour.writeMaterial(name, colour.simpleRGB(colour.filter(spectrum, filter)), "output")
  drawBlock(block, o, 0.1, origin ,c,2, name)
}

const spectra = [
  [0,50,50, 33,33,34, 33,33,34] as colour.Spectrum,
  [50,0,50, 33,33,34, 33,33,34] as colour.Spectrum,
  [50,50,0, 33,33,34, 33,33,34] as colour.Spectrum,
  [33,33,34, 0,50,50, 33,33,34] as colour.Spectrum,
  [33,33,34, 50,0,50, 33,33,34] as colour.Spectrum,
  [33,33,34, 50,50,0, 33,33,34] as colour.Spectrum,
  [33,33,34, 33,33,34, 0,50,50] as colour.Spectrum,
  [33,33,34, 33,33,34, 50,0,50] as colour.Spectrum,
  [33,33,34, 33,33,34, 50,50,0] as colour.Spectrum,
]
for (let c = 0; c < 9; c++) {
  const name = `narrow_notch_${c}`;
  colour.writeMaterial(name, colour.simpleRGB(colour.filter(spectra[c], filter)), "output")
  drawBlock(block, o, 0.1, origin ,c,3, name)
}

for (let c = 0; c < 9; c++) {
  const name = `random-b${c}`
  let spectrum = [...Array(9)] as colour.Spectrum
  spectrum = spectrum.map(v => randomLevel()) as colour.Spectrum
  colour.writeMaterial(name, colour.simpleRGB(colour.filter(spectrum, filter)), "output")
  drawBlock(block, o, 0.1, origin ,c,4, name)
}

const white = Array(9).fill(33) as colour.Spectrum
colour.writeMaterial('white', colour.simpleRGB(colour.filter(white, filter)), "output")
for (let c = 0; c < 9; c++) {
  drawBlock(block, o, 0.1, origin ,c,5, 'white')
}

for (let c = 0; c < 9; c++) {
  const name = `temp${c}`
  let spectrum = [...Array(9)] as colour.Spectrum
  for (let f=0; f<9 ;f++) {
    spectrum[f] = f<c? 100:0
  }
  colour.writeMaterial(name, colour.simpleRGB(colour.filter(spectrum, filter)), "output")
  drawBlock(panel, o, 0.1, origin ,-5,(c * 3) - 15, name)
}

const offWhite = Array(9).fill(33) as colour.Spectrum
offWhite[8] = 0;
colour.writeMaterial('offWhite', colour.simpleRGB(colour.filter(offWhite, filter)), "output")
  
for (let c = 0; c < 9; c++) {
  drawBlock(panel, o, 0.1, origin ,20,(c * 3) - 15, 'offWhite')
}
const skyBlue = Array(9).fill(33) as colour.Spectrum
skyBlue[0] = 0;
skyBlue[1] = 0;
skyBlue[2] = 0;
colour.writeMaterial('skyBlue', colour.simpleRGB(colour.filter(skyBlue, filter)), "output")
  
drawBlock(lid, o, 0.1, origin ,-20,-10 , 'skyBlue')
drawBlock(floor, o, 0.1, origin ,-20,-10 , 'white')
o.write('output','test')
