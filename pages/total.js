import { useCallback, useEffect } from "react"
import useQuiosco from "../hooks/useQuiosco"
import Layout from "../layout/Layout"
import {formatMoney} from '../helpers'

export default function Total() {

    const {order, name, total, setName, createOrder} = useQuiosco()

    const validateOrder = useCallback(() => {
        return order.length === 0 || name.length < 3
    }, [order, name])

    useEffect(() => {
        validateOrder()
    }, [order, validateOrder])

    

    return (
        <Layout page='Resumen'>
            <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

            <form
                onSubmit={createOrder}
            >
                <div>
                    <label 
                        className="block uppercase text-slate-800 font-bold text-xl"
                        htmlFor="name"
                    >Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar {""} <span className="font-bold">{formatMoney(total)}</span></p>
                </div>

                <div>
                    <input
                        type="submit"
                        className={`${validateOrder() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} w-full lg:w-auto px-5 py-2 mt-2 rounded uppercase font-bold text-white text-center`}
                        value="Confirmar pedido"
                        disabled={validateOrder()}
                    />
                </div>
            </form>
        </Layout>

        
    )
}