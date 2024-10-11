import { Injectable } from '@angular/core';
import GLPKConstructor, { GLPK } from 'glpk.js';

interface Variable {
  name: string;
  coef: number;
  bounds?: {
    type: number;
    ub?: number;
    lb?: number;
  };
}

interface Restriccion {
  name: string;
  vars: { name: string; coef: number }[];
  bnds: {
    type: number;
    ub: number; // Siempre debe ser un número
    lb: number; // Siempre debe ser un número
  };
}

interface Problema {
  name: string;
  objective: {
    direction: number;
    name: string;
    vars: Variable[];
  };
  subjectTo: Restriccion[];
}

@Injectable({
  providedIn: 'root'
})
export class ProgramacionLinealService {
  glpk: any;

  constructor() {}

  async inicializarGLPK() 
  {
    if (!this.glpk) 
    {
      this.glpk = await GLPKConstructor(); 
    }
    return this.glpk;
  }

  async resolverProblemaTransporte(costo1A:number,costo2A:number,costo3A:number,costo1B:number,costo2B:number,costo3B:number,
    produccionA:number,produccionB:number,capacidad1:number,capacidad2:number,capacidad3:number)
  {
    const glpk = await this.inicializarGLPK();
    
    if (!this.glpk) {
      console.error('GLPK no está inicializado');
      return;
    }    

    // Definir la matriz de costos, producciones de las fabricas y capacidades de los depositos
    const costos = [
      [costo1A, costo2A, costo3A], // Costos de transporte de la fábrica A
      [costo1B, costo2B, costo3B], // Costos de transporte de la fábrica B
    ];
    const producciones = [produccionA, produccionB]; // producciones de las fábricas A y B
    const capacidades = [capacidad1, capacidad2, capacidad3]; // capacidades de los depositos

    const problema: Problema = 
    {
      name: 'Problema de Transporte',
      objective: {
        direction: this.glpk.GLP_MIN, // Minimizar el costo total
        name: 'coste',
        vars: []
      },
      subjectTo: []
    };

    // Variables de decisión
    for (let i = 0; i < producciones.length; i++) {
      for (let j = 0; j < capacidades.length; j++) {
        const variable: Variable = {
          name: `x_${i}_${j}`,
          coef: costos[i][j],
          bounds: { type: this.glpk.GLP_LO, ub: capacidades[j] } 
        };
        problema.objective.vars.push(variable);
      }
    }

    // Restricciones de produccion fabricas
    producciones.forEach((produccion, i) => {
      const restriccionProduccion: Restriccion = {
        name: `Produccion_${i}`,
        vars: [],
        bnds: { type: this.glpk.GLP_UP, ub: produccion, lb: 0 }
      };
      for (let j = 0; j < producciones.length; j++) {
        restriccionProduccion.vars.push({ name: `x_${i}_${j}`, coef: 1 });
      }
      problema.subjectTo.push(restriccionProduccion);
    });

    // Restricciones de capacidad depositos
    capacidades.forEach((capacidad, j) => {
      const restriccionCapacidad: Restriccion = {
        name: `Capacidad_${j}`,
        vars: [],
        bnds: { type: this.glpk.GLP_LO, lb: capacidad, ub: capacidad } 
      };
      for (let i = 0; i < producciones.length; i++) {
        restriccionCapacidad.vars.push({ name: `x_${i}_${j}`, coef: 1 });
      }
      problema.subjectTo.push(restriccionCapacidad);
    });

    // Resolver el problema con this.glpk.js
    console.log('Problema a resolver:', problema);
    const resultado = this.glpk.solve(problema);
    console.log('Resultado:', resultado);
    return resultado;
  }
}