// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { CustomError } from '@/error';
// import useAxiosPrivate from '@/hooks/useAxiosPrivate';
// // import useUserInfo from '@/hooks/useUserInfo';
// import { useQuery } from '@tanstack/react-query';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import Select from 'react-select';

const SubjectFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const type = params.get('type') || '';
    const division = params.get('division') || '';
    const universityType = params.get('universityType') || '';
    const universityName = params.get('universityName') || '';
    // const subject = params.get('subject') || '';
    const unit = params.get('unit') || '';
    // const SubjectFilter = () => {
    //     // const [isOpen, setIsOpen] = useState(false);
    //     const axiosPrivate = useAxiosPrivate();
    //     const router = useRouter();
    //     const pathname = usePathname();
    //     const searchParams = useSearchParams();
    //     const params = new URLSearchParams(searchParams);
    //     const type = params.get('type') || '';
    //     const division = params.get('division') || '';
    //     const universityType = params.get('universityType') || '';
    //     const universityName = params.get('universityName') || '';
    //     // const subject = params.get('subject') || '';
    //     const unit = params.get('unit') || '';

    // const user = userData?.data
    const { data, error } = useQuery({
        queryKey: ['subjects', type, division, universityType, universityName, unit],
        queryFn: async () => {
            const response = await axiosPrivate.get(
                `/category/subject?limit=0${type ? `&type = ${type}` : ''}${division ? `&division=${division}` : ''}`,
                {
                    withCredentials: true
                }
            );
            return response.data;
        }
    });

    if (error)
        throw new CustomError(
            404,
            'Fetch Failed',
            'Failed to fetch the requested resource'
        );

    const subjects = data?.data;
    const options = subjects?.map((subject: any) => ({
        value: subject,
        label: subject
    }));
    // const defaultOption = options?.find(
    //     (option: any) => option.value === territoryId
    // )

    const handleChange = (option: any) => {
        const params = new URLSearchParams(searchParams);
        if (!option) {
            params.delete('subject');
        } else {
            params.set('subject', option.value);
            // params.set('page', '1')
        }
        router.replace(${ pathname } ? ${ params.toString() });
    };
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            display: 'flex',
            width: '100%',
            height: '1.6rem',
            // padding: '0.5rem 1.5rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            // gap: '0.3rem',
            backgroundColor: 'white',
            borderColor: '#e5e7eb',

            '&:hover': {
                borderColor: '#cbd5e1'
            }
        }),
        option: (provided: any) => ({
            ...provided,
            fontSize: '0.8rem',
            fontWeight: '400'
        }),
        clearIndicator: (provided: any) => ({
            ...provided,
            padding: '0.1rem',
            height: 'auto'
        }),
        menu: (provided: any) => ({
            ...provided,
            maxHeight: '200px',
            overflowY: 'auto'
        }),
        menuList: (provided: any) => ({
            ...provided,
            maxHeight: '200px',
            overflowY: 'auto',
            paddingRight: '2px'
        })
    };
    return (
        <div className='flex flex-col gap-1 w-full sm:w-[10rem]'>
            <Select
                options={options}
                // value={defaultOption}
                onChange={option => handleChange(option)}
                placeholder='Select Subject'
                styles={customStyles}
                isClearable
                instanceId='subject'
            />
        </div>
    );
};

export default SubjectFilter;