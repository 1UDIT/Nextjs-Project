import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='pt-96 mt-10 mb-10 text-center text-gray-200 text-xl h-max'> 
      <h1>Not found  404!</h1>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  )
}