import { guardarDB, leerDb } from "./helpers/guardarArchivo.js";
import {
    completarTareas,
    confirmar,
    inquirerMenu,
    leerInput,
    listadoTareasBorrar,
    pausa,
} from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";

const main = async () => {
    let opt = "";
    const tareas = new Tareas();
    const tareasDb = leerDb();

    if (tareasDb) {
        tareas.cargarTareasFromArr(tareasDb);
    }
    do {
        //imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                //crear input para definir la descripcio de la tarea
                const desc = await leerInput("descripcion:");
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3":
                //listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case "4":
                //listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case "5":
                const completarTareas2 = await completarTareas(
                    tareas.listadoArr
                );
                tareas.toggleCompletadas(completarTareas2);
                break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if (id !== 0) {
                    const choice = await confirmar(
                        `¿ Estas seguro de borrar la tarea ?`
                    );
                    if (choice) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada".green);
                    }
                }

                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== "0");
};

main();
