import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Expired() {
  return (
    <>
      <h1 className='text-4xl mb-4'>Downlaod Link expired</h1>
      <Button asChild size="lg">
    <Link href="/orders">
    Get new link
    </Link>
      </Button>
    </>
  )
}

export default Expired
