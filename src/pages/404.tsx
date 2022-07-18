import { NextPage } from 'next';
import Link from 'next/link';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import useStateContext from '../context/ContextProvider';

import MetaHead from '../components/MetaHead';
import Heading from '../components/Text/Heading';
import ButtonTertiary from '../components/Buttons/ButtonTertiary';

const FourOuFour: NextPage = () => {
    const { isDarkMode } = useStateContext();

    return (
        <>
            <MetaHead title='404 — Page not found' />
            <main
                className={` w-full main-h fixed flex flex-col justify-center items-center flex-1 p-3 transition-colors ${
                    isDarkMode ? 'bg-neutral-700' : 'bg-slate-100'
                } `}
            >
                <section className='container flex flex-col items-center gap-y-6'>
                    <Heading
                        type='h1'
                        text='404'
                        customCss='text-blue-500 font-bold'
                    />
                    <Heading
                        type='h2'
                        text='You have found a secret place.'
                        customCss='text-center'
                    />
                    <Heading
                        type='h3'
                        text='Unfortunately, the page you are looking for does not exist.'
                        customCss='text-center'
                    />
                    <Link href='/'>
                        <ButtonTertiary
                            type='button'
                            text='Go back home'
                            icon={faHome}
                            spanCss='!text-base md:!text-lg lg:!text-xl'
                        />
                    </Link>
                </section>
            </main>
        </>
    );
};

export default FourOuFour;
