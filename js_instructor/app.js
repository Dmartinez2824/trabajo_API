
const solicitud = async (url) => { //const que guarda la solicitudes una callback, pide el url de usuarios,postsusuarios, etc...
    const respuesta = await fetch(url); //const que guardara el fetch 
    return await respuesta.json(); //retorna respuesta parseado con el .json
}

const usuarios = async () => await solicitud(`https://jsonplaceholder.typicode.com/users`); //el fetch de los usuarios
const postUsuarios = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`); //a esta funcion de una linea le lanzamos el parametro del userId, que da del 1 al 10 // el ? es un parametro en el link
const comentariosPost = async (PostId) => await solicitud(`https://jsonplaceholder.typicode.com/comments?postId=${PostId}`); //esta funcion arrow de una linea el parametro sera el postId que de los 'n' post me lanzara los comentarios
const albums = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
const fotosAlbums = async (userId) => await solicitud(`https://jsonplaceholder.typicode.com/photos?albumsId=${albumId}`);

const cargar = async () => { //dentro de esta funcion almacenaremos los datos, entrando en usuarios y guardando los post con sus comentarios...
    const users = await usuarios(); //users sera que guardara el array de la api usuarios
    const respuesta = await Promise.all( //respuesta sera el parametro que almacene post, la promesa.all nos ayuda a resolver el arojado de las 'n' promesas que nos bota el post
        users.map(async(user)=>{ //un mapeo de el array usuarios
            const albums = await albums(user.Id);
            const fotosAlbums = await Promise.all(
              albums.map(async (album) => {
                const fotos = await fotosAlbums(album.id);
                return{ ...albums, fotos}
                })  
            );
            const posts = await postUsuarios(user.id); //constante posts que llamara a la api de postusuarios por la cantidad de user.id que haya
            const postComentarios = await Promise.all( // generamos una promesa ya que los post si son extraidos pero los comentarios dentro de los post no se encuentran
                posts.map(async(post)=>{ //mapeamos los post para soltar las promesas de los comentarios
                    const comentarios = await comentariosPost(post.id); // filtramos los comentarios en el fetch y lo guardamos en la const
                    return {...post, comentarios} //comenzamos hacer el push, para subirlo utilizamos el return con un operador de propagacion 'spread' para que nos nos guarde dentro de otro array con todos
                })
            );
            return{...user, post: postComentarios, albums:fotosAlbums} //utilizamos el return con un operador de propagacion 'spread' para que nos nos guarde dentro de otro array, como lo que hicimos con los comentarios
                                                    //post: postComentarios, el 'post:' es el alias del array, que guardara los postComentarios
        })
    );
    console.log(respuesta);//imprimimos respuesta (la union de posts dentro de usuarios) 
}

cargar(); //llama funcion cargar 