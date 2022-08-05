import Image from "next/image";
import {formatMoney} from '../helpers'
import useQuiosco from "../hooks/useQuiosco";

const ProductSummary = ({product}) => {
    const { handleChangeQuantity, handleDeleteQuantity } = useQuiosco()
    return (
        <div className="shadow p-5 mb-3 flex gap-10 items-center">
            <div className="md:w-1/6">
                <Image
                    width={300}
                    height={400}
                    alt={`Imagen de ${product.name}`}
                    src={`/assets/img/${product.image}.jpg`}
                />
            </div>
            <div className="md:w-4/6">
                <p className="text-3xl font-bold">{product.name}</p>
                <p className="text-xl font-bold mt-2">Cantitad: {product.quantity}</p>
                <p className="text-xl font-bold text-amber-500 mt-2">Precio: {formatMoney(product.quantity)}</p>
                <p className="text-sm text-gray-700 mt-2">Subtotal: {formatMoney(product.quantity * product.quantity)}</p>
            </div>
            <div className="md:w-1/6">
                <button
                    type="button"
                    className="bg-sky-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full"
                    onClick={() => handleChangeQuantity(product.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Editar
                </button>
                <button
                    type="button"
                    className="bg-red-700 flex gap-2 px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full mt-3"
                    onClick={() => handleDeleteQuantity(product.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ProductSummary;