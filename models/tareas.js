import Tarea from "./tarea.js";
import colors from "colors";

class Tareas {
    _listado = {};

    get listadoArr() {
        //retorna un array con los objetos que tenga _listado
        const listado = Object.values(this._listado);
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArr(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.map((listado, index) => {
            if (listado.completadoEn === null) {
                console.log(
                    `${colors.green(index + 1 + ".")} ${listado.desc}`,
                    "::".yellow,
                    "Pendiente".red
                );
            } else {
                console.log(
                    `${colors.green(index + 1)} ${listado.desc}`,
                    "::".yellow,
                    "Completado".green
                );
            }
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Pendiente".red;
            if (completadas) {
                //mostrar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(
                        `${colors.green(contador.toString() + ".")} ${desc} ${
                            "::".yellow
                        } ${colors.green(completadoEn)} `
                    );
                }
            } else {
                //mostrar pendientes
                if (!completadoEn) {
                    contador += 1;
                    console.log(
                        `${colors.green(contador.toString() + ".")} ${desc} ${
                            "::".yellow
                        } ${estado} `
                    );
                }
            }
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

export default Tareas;
