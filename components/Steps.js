import {useRouter} from 'next/router'

const steps = [
    {step: 1, name: 'Menú', url: '/'},
    {step: 2, name: 'Resumen', url: '/summary'},
    {step: 3, name: 'Datos y total', url: '/total'}
]

const Steps = () => {
    const router = useRouter()

    const calcProgress = () => {
        if(router.pathname === '/'){
            return 2
        }else if(router.pathname === '/summary'){
            return 50
        }else{
            return 100
        }
    }

    return (
        <>
            <div 
                className="flex justify-between mb-5"
            >
                {steps.map(step => (
                    <button
                        key={step.step}
                        className='text-2xl font-bold'
                        onClick={() => {
                            router.push(step.url)
                        }}
                    >
                       {step.name} 
                    </button>
                ))}
            </div>

            <div className='bg-gray-100 mb-10'> 
                <div className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white' style={{width: `${calcProgress()}%`}}>

                </div>
            </div>
        </>
    );
};

export default Steps;