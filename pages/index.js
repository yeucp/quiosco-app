import Head from 'next/head'
import Image from 'next/image'

import Layout from '../layout/Layout'
import Product from '../components/Product'
import useQuiosco from '../hooks/useQuiosco'

export default function Home() {
  const {currentCategory} = useQuiosco()
  return (
    <Layout page={`Menú ${currentCategory?.name}`}>
      <h1 className='text-4xl font-black'>{currentCategory?.name}</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
      <div className='grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {currentCategory?.products?.map(product => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </div>
      
    </Layout>
  )
}
