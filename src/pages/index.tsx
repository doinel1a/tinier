import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { nanoid } from 'nanoid';
import copy from 'copy-to-clipboard';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
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
    const { isDarkMode } = useStateContext();
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

    useEffect(() => {
        console.log(
            form.url.length === 0 ||
                (slugCheck.isFetched && slugCheck.data!.used)
        );
    }, [form]);

    const createSlug = trpc.useMutation(['createSlug']);
    // createSlug.status = 'success';
    useEffect(() => {
        setHostname(window.location.origin);
    }, []);

    return (
        <>
            <MetaHead />
            <main
                className={`
                    w-full main-h z-0 flex lg:justify-center items-center transition-colors 
                    ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'}
                `}
            >
                {createSlug.status === 'success' ? (
                    <form
                        className={`glass transition-colors ${
                            isDarkMode ? 'glass-dark' : 'glass-light'
                        }`}
                    >
                        <div className='flex flex-col gap-y-6'>
                            <div className='flex flex-col text-white'>
                                <label
                                    htmlFor='url'
                                    className={`
                                        md:text-lg lg:text-xl transition-colors
                                        ${
                                            isDarkMode
                                                ? 'text-primary-dark'
                                                : 'text-primary-light'
                                        }
                                    `}
                                >
                                    Your LONG url
                                </label>
                                <input
                                    id='url'
                                    type='text'
                                    value={`${form.protocol}${form.url}`}
                                    disabled={true}
                                    className='p-2 text-[#333] rounded-lg bg-gray-100'
                                />
                            </div>

                            <div className='flex flex-col'>
                                <div className='flex justify-between'>
                                    <label
                                        htmlFor='alias'
                                        className={`
                                            md:text-lg lg:text-xl transition-colors
                                        ${
                                            isDarkMode
                                                ? 'text-primary-dark'
                                                : 'text-primary-light'
                                        }
                                    `}
                                    >
                                        Tinier url
                                    </label>
                                    <label
                                        className={` mr-12 md:text-lg lg:text-xl text-green-300 `}
                                    >
                                        {copied ? 'Copied' : ''}
                                    </label>
                                </div>
                                <div className='flex'>
                                    <input
                                        id='alias'
                                        type='text'
                                        value={`${hostname}/${form.slug}`}
                                        disabled={true}
                                        className='w-[25rem] mr-2 p-2 text-[#333] rounded-lg bg-gray-100'
                                    />
                                    <ButtonIcon
                                        type='button'
                                        icon={faCopy}
                                        title='Copy tinier url'
                                        ariaLabel='Copy tinier url'
                                        onClick={() => {
                                            setCopied(true);
                                            copy(`${hostname}/${form.slug}`);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='h-14 flex justify-center'>
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
                ) : (
                    <form
                        className={`glass transition-colors ${
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
                                    className={`
                                        md:text-lg lg:text-xl transition-colors
                                        ${
                                            isDarkMode
                                                ? 'text-primary-dark'
                                                : 'text-primary-light'
                                        }
                                    `}
                                >
                                    Enter a LONG url to make tinier
                                </label>
                                <div className='relative'>
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
                                            className='h-full focus:ring-indigo-500 focus:border-indigo-500 py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-sm'
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    protocol: e.target.value,
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
                                        className='w-full pl-28 p-2 text-[#333] rounded-lg'
                                        onChange={(e) => {
                                            setForm({
                                                ...form,
                                                url: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <div className='flex text-white'>
                                <div className='flex flex-col'>
                                    <label
                                        htmlFor='url-origin'
                                        className={`
                                        md:text-lg lg:text-xl transition-colors
                                        ${
                                            isDarkMode
                                                ? 'text-primary-dark'
                                                : 'text-primary-light'
                                        }
                                    `}
                                    >
                                        Customize your link
                                    </label>
                                    <input
                                        id='url-origin'
                                        type='text'
                                        placeholder={hostname}
                                        className='p-2 placeholder-[#333] rounded-l-lg bg-gray-300'
                                        disabled={true}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    {slugCheck.data?.used &&
                                    form.slug !== '' ? (
                                        <label
                                            htmlFor='alias'
                                            className={`md:text-lg lg:text-xl text-red-300`}
                                        >
                                            Alias used
                                        </label>
                                    ) : (
                                        <label
                                            htmlFor='alias'
                                            className={`
                                                md:text-lg lg:text-xl transition-colors
                                                ${
                                                    isDarkMode
                                                        ? 'text-primary-dark'
                                                        : 'text-primary-light'
                                                }
                                            `}
                                        >
                                            Alias
                                        </label>
                                    )}
                                    <div className='flex gap-x-2'>
                                        <input
                                            id='alias'
                                            type='text'
                                            value={form.slug}
                                            className='mr-2 p-2 text-[#333] rounded-r-lg'
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
                                            icon={faArrowsRotate}
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

                        <div className='h-14 flex justify-end'>
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
                                        (slugCheck.isFetched &&
                                            slugCheck.data!.used)
                                            ? 'cursor-not-allowed bg-blue-800'
                                            : 'cursor-pointer bg-blue-500 hover:bg-blue-700 focus:bg-blue-700'
                                    }
                                `}
                            />
                        </div>
                    </form>
                )}
            </main>
        </>
    );
};

export default Home;
