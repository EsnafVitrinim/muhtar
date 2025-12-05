"use client"
import SignUpForm from "./SignUpForm";

function SignUpPage() {
  return (
    <div className='min-h-screen mx-auto w-full p-4 flex justify-center items-center bg-slate-50 dark:bg-dark-400'>
      <div className='w-full max-w-[500px] py-10 flex flex-col gap-6'>
        <div className="pb-4 border-b border-slate-200 border:bg-dark-200">
          <h1 className="text-3xl font-bold text-black dark:text-dark-50">Kayıt Ol</h1>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage
