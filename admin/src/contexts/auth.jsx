import { useLazyQuery } from "@apollo/client"
import { LOGIN } from "graphql/queries/login"
import { useApollo } from "./graphql"
import { createContext, useState, useMemo, useEffect, useCallback, useContext } from "react"
import { useNavigate } from "react-router"
import { GET_PROFILE } from "graphql/queries/user"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    const { accessToken, saveToken } = useApollo()
    const navigate = useNavigate()

    const [loginQuery, { data, loading, error }] = useLazyQuery(LOGIN, { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true })
    const [getInfo, { data: info }] = useLazyQuery(GET_PROFILE)

    useEffect(() => {
        if (!accessToken) {
            navigate('/login')
        }
    }, [accessToken])

    useEffect(() => {
        if (data && !error) {
            saveToken(data.admin.accessToken)
            getInfo()
            setTimeout(() => logout, 60 * 60 * 1000)
        }
    }, [data, loading, error])

    useEffect(() => {
        if(info) {
            setUser(info.profile)
        }
    }, [info])

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
        setUser(undefined)
        saveToken(undefined)
    }, [])

    const memoedValue = useMemo(() => ({
        user,
        login,
        loading,
        error,
        logout
    }), [user, login, loading, error, logout])

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider