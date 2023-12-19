import { fastify } from 'fastify'
import {DatabaseMemory} from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'Olá Mundo'
})

server.post('/despacho', (request, reply) => {
    //const body = request.body//
   //console.log(body)//
   const {numrequerimento, juiz, npaginasrequerimento } = request.body
    database.create({
        numrequerimento: numrequerimento,
        juiz: juiz,
        npaginasrequerimento: npaginasrequerimento
    })
    console.log(database.list())
    return reply.status(201).send()
})

server.get('/despacho', (request) => {
    const search = request.query.search

    console.log(search)
    
    const despachos = database.list(search)
   
    return despachos
})

server.put('/despacho/:id', (request, reply) => {

    const despachoId = request.params.id
    const {numrequerimento, juiz, npaginasrequerimento} = request.body
    const despacho = database.update(despachoId, {
        numrequerimento,
        juiz,
        npaginasrequerimento,
    })
    return reply.status(204).send()
})

server.patch('/despacho/:id', (request, reply) => {

    const despachoId = request.params.id
    const {numrequerimento} = request.body
    const despacho = database.update(despachoId, {
        numrequerimento
    })
    return reply.status(204).send()
})

server.delete('/despacho/:id', (request, reply) => {
    const despachoId = request.params.id

    database.delete(despachoId)

    return reply.status(204).send()
})

server.listen({
    port: 3333,
})