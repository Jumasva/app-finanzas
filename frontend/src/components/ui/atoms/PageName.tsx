'use client'

import { usePathname } from "next/navigation"

export function PageName() {
    const PageName = usePathname()
    return <p>{PageName}</p>;
}