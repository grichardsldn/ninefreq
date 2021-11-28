import * as colour from "./colour"

import { WavefrontObject } from './WavefrontObject'


// const pink = [90,90,90, 80,80,80, 80,80, 80] as colour.Spectrum

// colour.writeMaterial("pink", colour.simpleRGB(colour.filter(pink, colour.LOW_FILTER)), "output")


const o = new WavefrontObject()
o.addTriangle([0,0,0],[1,1,1],[0,0,1],'pink')
o.addTriangle([0,0,0],[1,1,1],[0,0,1],'blue')
o.addQuadrilateral([0,0,0],[0,1,0],[0,1,1],[0,0,1], 'pink')
o.write('output','test')
