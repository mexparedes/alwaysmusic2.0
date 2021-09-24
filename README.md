# Desafío - Always Music 2.0

En este desafío deberás ocupar la clase Pool definiendo sus diferentes propiedades, capturar los posibles errores en el proceso de conexión con la base de datos y realizar las siguientes consultas, usando textos parametrizados y Prepared Statement:

- Agregar un nuevo estudiante.
- Consultar los estudiantes registrados.
- Consultar estudiante por rut.
- Actualizar la información de un estudiante.
- Eliminar el registro de un estudiante.

## En otras palabras

A través de la terminal debemos ingresar los argumentos necesarios para obtener las diferentes consultas:

Las líneas de comandos que deben escribirse son las siguientes:

- NUEVO USUARIO node index.js nuevo <nombre_usuario> <rut> <curso> <nivel>
- CONSULTA POR RUT node index.js rut <rut>
- CONSULTAR TODOS LOS USUARIOS node index.js consultas
- EDITAR USUARIO node index.js editar <nombre_usuario> <rut> <curso> <nivel>
- ELIMINAR USUARIO node index.js eliminar <rut>

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

- $ git clone https://github.com/krakerbrain/desafio_always_music_2.0
- $ cd ../path/to/the/file
- $ npm install
- $ npm index.js <argumentos necesarios descritos arriba>

### Requerimientos

1. Realizar la conexión con PostgreSQL, utilizando la clase Pool y definiendo un máximo de 20 clientes, 5 segundos como tiempo máximo de inactividad de un cliente y 2 segundos de espera de un nuevo cliente.
2. Hacer todas las consultas con un JSON como argumento definiendo la propiedad name para el Prepared Statement.
3. Hacer las consultas con texto parametrizado.
4. Liberar a un cliente al concluir su consulta.
5. Capturar los posibles errores en todas las consultas.
6. Retornar por consola un mensaje de error en caso de haber problemas de conexión.
7. Obtener el registro de los estudiantes registrados en formato de arreglos.

##### Las consultas deben verse asi:

![Roommates](/readme_files/consultas.jpg)

## Construido con 🛠️

- [nodeJS](https://nodejs.org/en/)
- [node-postgres](https://node-postgres.com/api/pool)

## Autor ✒️

- **Mario Montenegro**
- **Maximiliano Paredes**
- **Eduardo Montenegro**
- **Eric Leiva**
