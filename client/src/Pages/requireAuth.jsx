import { useSelector } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn, roles } = useSelector(state => state?.auth);
    const navigate = useNavigate()
    return isLoggedIn && allowedRoles.find((myRole) => myRole == roles) ? <Outlet /> : (isLoggedIn ? <Navigate to={'/denied'} /> : <Navigate to={'/login'} />)
}

export default RequireAuth