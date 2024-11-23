function resources() {
const posts = async () =>{
    try{
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/comments/1');
        if(respuesta.status !== 0){
        return await respuesta.json();
        }else{
            throw new Error("no hay datos");
        }
    }catch(error){
        console.error("Error al obtener los posts:", error);
        
    }
}
// posts().then(data => console.log(data));


const comments = async () =>{
    try{

        const respuesta = await fetch('https://jsonplaceholder.typicode.com/comments');
        if(respuesta.status !== 0){
        return await respuesta.json();
        }else{
            throw new Error("no hay datos");
        }
    }catch(error){
        console.error("Error al obtener los comments:", error);
    }
}
// comments().then(data => console.log(data));


const albums = async () =>{
    try{

        const respuesta = await fetch('https://jsonplaceholder.typicode.com/albums');
        if(respuesta.status !== 0){
            return await respuesta.json();
            }else{
                throw new Error("no hay datos");
            }
        }catch(error){
            console.error("Error al obtener los albums:", error);
    }
}
// albums().then(data => console.log(data));


const photos = async () =>{
    try{

        const respuesta = await fetch('https://jsonplaceholder.typicode.com/photos');
        if(respuesta.status !== 0){
            return await respuesta.json();
            }else{
                throw new Error("no hay datos");
            }
        }catch(error){
            console.error("Error al obtener los photos:", error);
    }
}
// photos().then(data => console.log(data));


const todos = async () =>{
    try{

        const respuesta = await fetch('https://jsonplaceholder.typicode.com/todos');
        if(respuesta.status !== 0){
            return await respuesta.json();
            }else{
                throw new Error("no hay datos");
            }
        }catch(error){
            console.error("Error al obtener los todos:", error);
    }
}
// todos().then(data => console.log(data));
const unirDatos = async () => {
      const datosPosts = await posts();
      const datosComments = await comments();
      const datosAlbums = await albums();
      const datosPhotos = await photos();
      const datosTodos = await todos();
      
      const datosUnidos = [].concat(datosPosts, datosComments, datosAlbums, datosPhotos, datosTodos);
      return datosUnidos;
    
  };

  return unirDatos ;
}   


const {unirDatos} = resources();

unirDatos()
  .then(data => console.log("Todos los datos unidos:", data))