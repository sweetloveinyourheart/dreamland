import { useLazyQuery } from "@apollo/client"
import { LOGIN } from "graphql/queries/login"
import { useApollo } from "./graphql"
import { createContext, useState, useMemo, useEffect, useCallback, useContext } from "react"
import { useNavigate } from "react-router"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    const { accessToken, saveToken } = useApollo()
    const navigate = useNavigate()

    const [loginQuery, { data, loading, error }] = useLazyQuery(LOGIN)

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken])

    useEffect(() => {
        if (data && !error) {
            saveToken(data.admin.accessToken)
            setUser({ name: "Administrator" })
            setTimeout(() => logout, 55 * 60 * 1000)
        }
    }, [data, loading, error])

    const login = useCallback((phone, password) => {
        loginQuery({
            variables: {
                account: {
                    phone,
                    password
                }
            }
        })
    }, [loginQuery])

    const logout = useCallback(() => {
        saveToken(undefined)
        setUser(undefined)
    }, [])

    const memoedValue = useMemo(() => ({
        user,
        login,
        loading,
        error,
        logout
    }), [user, login, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider