import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'

import axios from 'axios'

const QuioscoContext = createContext()

const QuiscoProvider = ({children}) => {

    const [order, setOrder] = useState([])
    const [categories, setCategories] = useState([])
    const [currentCategory, setCurrentCategory] = useState({})
    const [product, setProduct] = useState({})
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()

    const getCategories = async () => {
        const {data} = await axios('/api/categories')
        setCategories(data)
    }

    const createOrder = async e => {
        e.preventDefault()

        try {
            await axios.post('/api/orders', {items: order, name, total, date: Date.now().toString()})

            //reset app
            setOrder([])
            setCurrentCategory(categories[0])
            setName('')
            setTotal(0)

            toast.success('Pedido realizado correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (err) {
            console.error(err)
        }
    }

    const handleOrder = ({categoryId, ...product}) => {
        if(order.some(item => item.id === product.id)){
            const updatedOrder = order.map(item => item.id === product.id ? product : item)
            setOrder(updatedOrder)
            toast.success('Guardado correctamente')
        }else{
            setOrder([...order, product])
            toast.success('Agregado al pedido')
        }
        setModal(false)
    }

    const handleClickCurrentCategory = id => {
        const category = categories.find(cat => cat.id === id)
        setCurrentCategory(category)
        router.push('/')
    }

    const handleClickProduct = product => {
        setProduct(product)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleChangeQuantity = id => {
        const productForUpdate = order.find(product => product.id === id)
        setProduct(productForUpdate)
        setModal(!modal)
    }

    const handleDeleteQuantity = id => {
        const updatedOrder = order.filter(product => product.id !== id)
        setOrder(updatedOrder)
    }

    useEffect(()=> {
        getCategories()
    }, [])

    useEffect(() => {
        setCurrentCategory(categories[0])
    }, [categories])

    useEffect(() => {
        const newTotal = order.reduce((total, product) => (product.price * product.quantity) + total, 0)
        setTotal(newTotal)
    }, [order])

    return (
        <QuioscoContext.Provider
            value={{
                categories,
                currentCategory,
                product,
                modal,
                order,
                name,
                total,
                handleClickCurrentCategory,
                handleClickProduct,
                handleChangeModal,
                handleOrder,
                handleChangeQuantity,
                handleDeleteQuantity,
                setName,
                createOrder
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuiscoProvider
}

export default QuioscoContext