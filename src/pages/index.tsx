import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import copy from 'copy-to-clipboard';
import { faShare, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import { trpc } from '../utils/trpc';
import useStateContext from '../context/ContextProvider';

import MetaHead from '../components/MetaHead';

import ButtonPrimary from '../components/Buttons/ButtonPrimary';
import ButtonIcon from '../components/Buttons/ButtonIcon';

interface IForm {
    slug: string;
    protocol: string;
    url: string;
}

const Home: NextPage = () => {
    const { isMobile, isDarkMode } = useStateContext();
    const [form, setForm] = useState<IForm>({
        slug: '',
        protocol: 'https://',
        url: '',
    });
    const [hostname, setHostname] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const slugCheck = trpc.useQuery(['slugCheck', { slug: form.slug }], {
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const createSlug = trpc.useMutation(['createSlug']);

    useEffect(() => {
        setHostname(window.location.origin);
    }, []);

    return (
        <>
            <MetaHead />
            <main
                className={`
                    w-full main-h fixed z-0 flex justify-center items-center p-2 transition-colors 
                    ${isDarkMode ? 'bg-secondary-dark' : 'bg-secondary-light'}
                `}
            >
                {createSlug.status === 'success' ? (
                    <section className='container lg:max-w-4xl'>
                        <form
                            className={`h-[23rem] glass transition-colors ${
                                isDarkMode ? 'glass-dark' : 'glass-light'
                            }`}
                        >
                            <div className='flex flex-col gap-y-6'>
                                <div className='flex flex-col text-white'>
                                    <label
                                        htmlFor='url'
                                        className={`${
                                            isDarkMode
                                                ? 'text-color-dark'
                                                : 'text-color-light'
                                        }`}
                                    >
                                        Your LONG url
                                    </label>
                                    <input
                                        id='url'
                                        type='text'
                                        value={`${form.protocol}${form.url}`}
                                        disabled={true}
                                        className='rounded-lg'
                                    />
                                </div>

                                <div className='flex justify-between flex-col'>
                                    <div className='flex justify-between'>
                                        <label
                                            htmlFor='alias'
                                            className={`${
                                                isDarkMode
                                                    ? 'text-color-dark'
                                                    : 'text-color-light'
                                            }`}
                                        >
                                            Tinier url
                                        </label>
                                        <label className='text-green-300'>
                                            {copied ? 'Copied' : ''}
                                        </label>
                                    </div>
                                    <div className='flex gap-x-3'>
                                        <input
                                            id='alias'
                                            type='text'
                                            value={`${hostname}/${form.slug}`}
                                            disabled={true}
                                            className='rounded-lg'
                                        />
                                        <ButtonIcon
                                            type='button'
                                            icon={faCopy}
                                            title='Copy url'
                                            ariaLabel='Copy url'
                                            onClick={() => {
                                                setCopied(true);
                                                copy(
                                                    `${hostname}/${form.slug}`
                                                );
                                            }}
                                        />
                                        <ButtonIcon
                                            type='button'
                                            icon={faShare}
                                            title='Visit url'
                                            ariaLabel='Visit url'
                                            onClick={() => {
                                                window.open(
                                                    `${hostname}/${form.slug}`
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <ButtonPrimary
                                    type='button'
                                    text='Reset'
                                    onClick={() => {
                                        createSlug.reset();
                                        setForm({
                                            slug: '',
                                            protocol: 'https://',
                                            url: '',
                                        });
                                    }}
                                />
                            </div>
                        </form>
                    </section>
                ) : (
                    <section className='container lg:max-w-4xl'>
                        <form
                            className={`h-[23rem] glass transition-colors ${
                                isDarkMode ? 'glass-dark' : 'glass-light'
                            }`}
                            onSubmit={(e) => {
                                e.preventDefault();
                                createSlug.mutate({ ...form });
                            }}
                        >
                            <div className='flex flex-col gap-y-6'>
                                <div className='flex flex-col'>
                                    <label
                                        htmlFor='url'
                                        className={`${
                                            isDarkMode
                                                ? 'text-color-dark'
                                                : 'text-color-light'
                                        }`}
                                    >
                                        Enter a LONG url to make tinier
                                    </label>
                                    <div className='flex relative'>
                                        <div className='absolute inset-y-0 left-0 flex items-center'>
                                            <label
                                                htmlFor='protocol'
                                                className='sr-only'
                                            >
                                                Protocol
                                            </label>
                                            <select
                                                id='protocol'
                                                name='protocol'
                                                className='w-28 h-full cursor-pointer py-0 pl-2 pr-4 border rounded-tl-lg rounded-bl-lg text-gray-500 bg-white outline-none'
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        protocol:
                                                            e.target.value,
                                                    })
                                                }
                                            >
                                                <option value='https://'>
                                                    HTTPS
                                                </option>
                                                <option value='http://'>
                                                    HTTP
                                                </option>
                                            </select>
                                        </div>
                                        <input
                                            id='url'
                                            type='text'
                                            placeholder='www.google.com'
                                            autoComplete='off'
                                            className='ml-28 rounded-r-lg'
                                            onChange={(e) => {
                                                setForm({
                                                    ...form,
                                                    url: e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col justify-between sm:flex-row gap-y-2'>
                                    <div className='flex flex-col'>
                                        <label
                                            htmlFor='hostname'
                                            className={`${
                                                isDarkMode
                                                    ? 'text-color-dark'
                                                    : 'text-color-light'
                                            }`}
                                        >
                                            Hostname
                                        </label>
                                        <input
                                            id='hostname'
                                            type='text'
                                            placeholder={hostname}
                                            autoComplete='off'
                                            disabled={true}
                                            className={`sm:w-48 md:w-60 placeholder-[#333] ${
                                                isMobile
                                                    ? 'rounded-lg'
                                                    : 'rounded-l-lg'
                                            }`}
                                        />
                                    </div>
                                    <div className='w-full flex flex-col'>
                                        {slugCheck.data?.used &&
                                        form.slug !== '' ? (
                                            <label
                                                htmlFor='alias'
                                                className='text-red-300'
                                            >
                                                Alias used
                                            </label>
                                        ) : (
                                            <label
                                                htmlFor='alias'
                                                className={`${
                                                    isDarkMode
                                                        ? 'text-color-dark'
                                                        : 'text-color-light'
                                                }`}
                                            >
                                                Alias
                                            </label>
                                        )}
                                        <div className='flex justify-between items-center gap-x-3'>
                                            <input
                                                id='alias'
                                                type='text'
                                                value={form.slug}
                                                placeholder='google'
                                                autoComplete='off'
                                                className={`${
                                                    isMobile
                                                        ? 'rounded-lg'
                                                        : 'rounded-r-lg'
                                                }`}
                                                onChange={(e) => {
                                                    setForm({
                                                        ...form,
                                                        slug: e.target.value,
                                                    });
                                                    debounce(
                                                        slugCheck.refetch,
                                                        100
                                                    );
                                                }}
                                            />
                                            <ButtonIcon
                                                type='button'
                                                icon={faShuffle}
                                                title='Random alias'
                                                ariaLabel='Random alias'
                                                onClick={() => {
                                                    const slug = nanoid();
                                                    setForm({
                                                        ...form,
                                                        slug,
                                                    });
                                                    slugCheck.refetch();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <ButtonPrimary
                                    type='submit'
                                    text='Create'
                                    disabled={
                                        form.url.length === 0 ||
                                        (slugCheck.isFetched &&
                                            slugCheck.data!.used)
                                    }
                                    stateCss={`
                                    ${
                                        form.url.length === 0 ||
                                        form.slug.length === 0 ||
                                        (slugCheck.isFetched &&
                                            slugCheck.data!.used)
                                            ? 'cursor-not-allowed bg-blue-800 opacity-40'
                                            : 'cursor-pointer bg-blue-500 hover:bg-blue-700 focus:bg-blue-700'
                                    }
                                `}
                                />
                            </div>
                        </form>
                    </section>
                )}
            </main>
        </>
    );
};

export default Home;
