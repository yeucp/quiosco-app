import Layout from "../layout/Layout"
import ProductSummary from "../components/ProductSummary"

import useQuiosco from "../hooks/useQuiosco"

export default function Summary() {

    const {order} = useQuiosco()

    return (
        <Layout page='Resumen'>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>
            {order.length === 0 ? (
                <p className="text-center text-2xl">No hay elementos en tu pedido</p>
            ) : (
                order.map(product => (
                    <ProductSummary 
                        key={product.id}
                        product={product}
                    />
                ))
            )}
        </Layout>
    )
}