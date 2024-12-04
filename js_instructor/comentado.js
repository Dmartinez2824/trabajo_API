
//es una funcion expresada que funciona como una callback
const solicitud = async (url) => { 
    
    //es una funcion expresada que espera la respuesta de una solicitud en linea (genera promise)
    const respuesta = await fetch(url); 

    //parseamos y retornamos datos de json a datos primitivos
    return await respuesta.json(); 
}
//funcion expresada que envia un argumento(url) y recibe un parametro(respuesta.json()). respuesta que ya esta parseada
const usuarios = async () => await solicitud(`https://jsonplaceholder.typicode.com/users`);

//funciones expresadas que envian el argumento (id) y recibe un parametro(filtrado por el argumento "en desorden")
const postUsuarios = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`); 
const comentariosPost = async (PostId) => await solicitud(`https://jsonplaceholder.typicode.com/comments?postId=${PostId}`); 
const albums = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
const fotosAlbums = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/photos?albumsId=${albumId}`);
const tareasId = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);

//es la funcion principal que se encarga de almacenar, resolver, promesas y filtrar.
const cargar = async () => { 

    //funcion expresa que solicita todos los usuarios
    const users = await usuarios(); 

    //función expresada que resuelve todas las promesas que genera users(todas las promesas tienen que cumplirse)
    const respuesta = await Promise.all(

        //recorre usuarios
        users.map(async(user)=>{ 

            //funcion expresa que solicita todos los albumes con el id de los usuarios
            const albumes = await albums(user.Id);

            //funcion expresa que resuelve todas las promesas del albumes(todas las promesas tienen que cumplirse)
            const foticos = await Promise.all(

                //recorrer albumes
              albumes.map(async (album) => {

                //asociamos fotos a los id del album
                const fotos = await fotosAlbums(album.id);

                // retornamos albumes con las fotos asociados al (album.id)
                return{ ...albumes, fotos}
                })  
            );

            //funcion expresa que solicita todas las tareas con el id de los usuarios
            const tareas = await tareasId(user.Id);

            //funcion expresa que recorre array y crea un nuevo array que cumplen la condicion(objetos)
            const tareaCompletada = tareas.filter(tarea => tarea.completed);
            const tareaPendientes = tareas.filter(tarea => !tarea.completed);

            //funcion expresa que solicita todos los post con el id de los usuarios
            const posts = await postUsuarios(user.id); 

            //funcion expresa que resuelve todas las promesas de comentarios(todas las promesas tienen que cumplirse)
            const postComentarios = await Promise.all(

                //recorre post para asociar los comentarios
                posts.map(async(post)=>{ 

                    //asociamos comentarios a los id del post
                    const comentarios = await comentariosPost(post.id); 

                    //retornamos post con los comentarios asociados al (post.id)
                    return {...post, comentarios} 
                })
            );
            //retornamos una concatenacion de los datos filtrados dentro de user
            return{...user, post: postComentarios, albumcitos:foticos, completada: tareaCompletada, pendiente: tareaPendientes} 
                                                    
        })
    );
    //retornamos toda la respuesta
    return respuesta
}

//llamamos a la funcion cargar, resolvemos con .then e imprimimos
cargar().then(res => console.log(res)); 
