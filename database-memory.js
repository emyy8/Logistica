import { randomUUID } from "crypto"


export class DatabaseMemory{
    #despachos = new Map()

list(search){
    return Array.from(this.#despachos.entries()).map((despachoArray) => {
        const id = despachoArray[0]

        const data = despachoArray[1]

        return{
            id,
            ...data,
        }
        
    })
    .filter(despacho => {
        if (search){
        return despacho.numrequerimento.includes(search)
        }
        return true
    })
}

    create(despacho){
        const despachoId = randomUUID()
        this.#despachos.set(despachoId, despacho)
    }
    
    update(id, despacho){
        this.#despachos.set(id, despacho)
    }

    delete(id, despacho){
        this.#despachos.delete(id, despacho)
    }
}