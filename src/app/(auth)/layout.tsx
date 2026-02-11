

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) =>{
    return(
        <main className="">
            {children}
        </main>
    )
}

export default AuthLayout