// import  es  from '../store/index.js'

export default function ({req,route,redirect}) {
       
   
    console.log(req?.originalUrl ? req?.originalUrl : 'no original url')
    console.log(req?.baseUrl ? req?.baseUrl : 'no original url')
    console.log('route',route)
    if(route.path == '/hello/'){
        console.log('hit')
        return redirect('/sets')
    }
    return
}