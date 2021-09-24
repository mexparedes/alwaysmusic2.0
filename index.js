/* 1. Realizar la conexión con PostgreSQL, utilizando la clase Pool y definiendo un
máximo de 20 clientes, 5 segundos como tiempo máximo de inactividad de un
cliente y 2 segundos de espera de un nuevo cliente. */

const { Pool } = require("pg");

const argumentos = process.argv.slice(2);

let consulta = argumentos[0];
let nombre = argumentos[1];
let rut = argumentos[2];
let curso = argumentos[3];
let nivel = argumentos[4];

const config = {
  user: "mario",
  host: "localhost",
  database: "alwaysmusic",
  password: "1234",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

if (consulta == "nuevo") {
  async function ingresar(nombre, rut, curso, nivel) {
    pool.connect(async (error_conexion, client, release) => {
      // 6. Retornar por consola un mensaje de error en caso de haber problemas de conexión.
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        /* 2. Hacer todas las consultas con un JSON como argumento definiendo la propiedad
name para el Prepared Statement. */
        name: "ingresar-usuario",
        //3. Hacer las consultas con texto parametrizado.
        text: "INSERT INTO estudiante (nombre,rut,curso,nivel) VALUES ($1,$2,$3,$4) RETURNING *",
        values: [nombre, rut, curso, nivel],
      };

      try {
        const res = await client.query(SQLQuery);
        console.log(`El estudiante ${res.rows[0].nombre} agregado con éxito.`);
      } catch (error_consulta) {
        //5. Capturar los posibles errores en todas las consultas
        console.log(error_consulta.code);
      }

      // 4. Liberar a un cliente al concluir su consulta.
      release();
      pool.end();
    });
  }
  ingresar(nombre, rut, curso, nivel);
  //EJEMPLO CONSULTA: node index.js nuevo <nombre_usuario> <rut> <curso> <nivel>
}

if (consulta == "rut") {
  async function consulta_rut(rut) {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        //7. Obtener el registro de los estudiantes registrados en formato de arreglos.
        rowMode: "array",
        name: "consulta-rut",
        text: "SELECT * FROM estudiante WHERE rut = $1",
        values: [rut],
      };

      try {
        const res = await client.query(SQLQuery);
        console.log(res.rows[0]);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }

      release();
      pool.end();
    });
  }
  consulta_rut(nombre);
  //EJEMPLO CONSULTA: node index.js rut <rut>
}

if (consulta == "consulta") {
  async function consultarTodos() {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        rowMode: "array",
        name: "consultar-usuarios",
        text: "SELECT * FROM estudiante",
        values: [],
      };

      try {
        const res = await client.query(SQLQuery);
        console.log(res.rows);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }

      release();
      pool.end();
    });
  }
  consultarTodos();
  //EJEMPLO CONSULTA: node index.js consulta
}

if (consulta == "editar") {
  async function editar(nombre, rut, curso, nivel) {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        name: "editar-usuario",
        text: "UPDATE estudiante SET nombre = $1, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *",
        values: [nombre, rut, curso, nivel],
      };

      try {
        const res = await client.query(SQLQuery);
        console.log(`El estudiante ${res.rows[0].nombre} editado con éxito.`);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }

      release();
      pool.end();
    });
  }
  editar(nombre, rut, curso, nivel);
  //EJEMPLO CONSULTA: node index.js editar <nombre_usuario> <rut> <curso> <nivel>
}

if (consulta == "eliminar") {
  async function eliminar(rut) {
    pool.connect(async (error_conexion, client, release) => {
      if (error_conexion) return console.error(error_conexion.code);

      const SQLQuery = {
        name: "eliminar-usuario",
        text: "DELETE FROM estudiante WHERE rut = $1 RETURNING *",
        values: [rut],
      };

      try {
        const res = await client.query(SQLQuery);
        console.log(`Registro de estudiante con rut ${res.rows[0].rut} eliminado.`);
      } catch (error_consulta) {
        console.log(error_consulta.code);
      }

      release();
      pool.end();
    });
  }
  eliminar(nombre);
  //EJEMPLO CONSULTA: node index.js eliminar <rut>
}
