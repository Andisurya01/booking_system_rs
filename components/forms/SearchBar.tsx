'use client'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { searchSchema, SearchFormValues } from '@/modules/schedules/schemas/search.schema'
import { Search } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
    onSearch: (values: SearchFormValues) => void
    defaultValues?: SearchFormValues
}

export default function SearchBar({ onSearch, defaultValues }: Props) {
    const { register, handleSubmit, control } = useForm<SearchFormValues>({
        resolver: zodResolver(searchSchema),
        defaultValues,
    })

    const watchSearch = useWatch({
        control,
        name: 'search',
        defaultValue: defaultValues?.search,
    })
    useEffect(() => {
        const timeout = setTimeout(() => {
            handleSubmit(onSearch)()
        }, 400)
        return () => clearTimeout(timeout)
    }, [watchSearch, handleSubmit, onSearch])

    return (
        <form onSubmit={handleSubmit(onSearch)} className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
                {...register('search')}
                placeholder="Cari dokter, spesialisasi..."
                className="pl-9 rounded-lg border-gray-200"
            />
        </form>
    )
}