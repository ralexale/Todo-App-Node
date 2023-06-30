import colors from "colors";

import { input } from "@inquirer/prompts";
import checkbox, { Separator } from "@inquirer/checkbox";
import confirm from "@inquirer/confirm";
import select from "@inquirer/select";

const inquirerMenu = async () => {
    console.clear();
    console.log("========================".green);
    console.log("  Selecione una opción".yellow);
    console.log("========================\n".green);

    const options = await select({
        message: "¿ Que desea hacer ?",
        choices: [
            {
                name: `${"1.".green} Crear una tarea`,
                value: "1",
                description: "crea una tarea",
            },
            {
                name: `${"2.".green} Listar tareas`,
                value: "2",
                description: "muestra la lista de tareas",
            },
            {
                name: `${"3.".green} Listar tareas completadas`,
                value: "3",
                description: "muestra la lista de tareas completadas",
            },
            {
                name: `${"4.".green} Listar tareas pendientes`,
                value: "4",
                description: "muestra la lista de tareas pendientes",
            },
            {
                name: `${"5.".green} Completar tarea(s)`,
                value: "5",
                description: "completar tarea pendientes",
            },
            {
                name: `${"6.".green} Borrar tarea`,
                value: "6",
                description: "borrar una tarea",
            },
            {
                name: `${"0.".red} Salir`,
                value: "0",
                description: "salir de la aplicacion",
            },
        ],
    });

    return options;
};

const pausa = async () => {
    console.log("\n");
    await input({
        message: `Presiona ${"Enter".yellow} para continuar`,
    });
};

const leerInput = async (message) => {
    const res = await await input({
        message,
        validate: (value) => (value ? true : "Por favor ingresa un valor"),
    });

    return res;
};

const listadoTareasBorrar = async (tareas = []) => {
    const opt = tareas.map((tarea, i) => {
        const idx = `${colors.green(i + 1 + ".")}`;
        return {
            name: `${idx} ${tarea.desc}`,
            value: tarea.id,
        };
    });

    opt.unshift({
        value: 0,
        name: "0.".green + " Cancelar",
    });

    const id = await select({
        message: "elija las tareas a borrar",
        choices: opt,
    });

    return id;
};

const confirmar = async (mensaje) => {
    const res = await confirm({
        message: mensaje,
    });
    return res;
};

const completarTareas = async (tareas = []) => {
    const opt = tareas.map((tarea, i) => {
        const idx = `${colors.green(i + 1 + ".")}`;
        return {
            name: `${idx} ${tarea.desc}`,
            value: tarea.id,
            checked: tarea.completadoEn ? true : false,
        };
    });

    const res = await checkbox({
        message: "Selectione la(s) Tareas".green,
        choices: opt,
    });
    return res;
};

export {
    leerInput,
    pausa,
    inquirerMenu,
    listadoTareasBorrar,
    confirmar,
    completarTareas,
};
