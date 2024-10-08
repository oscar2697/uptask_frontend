import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from '@/views/projects/CreateProjectView'
import EditProjectView from '@/views/projects/EditProjectView'
import ProjectsDetails from '@/views/projects/ProjectsDetails'
import AuthLayout from '@/layouts/AuthLayout'
import LoginView from '@/views/auth/LoginView'
import RegisterView from '@/views/auth/RegisterView'
import ConfirmAccountView from '@/views/auth/ConfirmAccountView'
import RequestNewCode from '@/views/auth/RequestNewCode'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'
import ProjectTeamView from './views/projects/ProjectTeamView'
import ProfileView from './views/profile/ProfileView'
import ChangePasswordView from './views/profile/ChangePasswordView'
import ProfileLayout from './layouts/ProfileLayout'
import NotFound from './views/404/NotFound'


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>} index />
                    <Route path='/projects/create' element={<CreateProjectView/>}/>
                    <Route path='/projects/:projectId' element={<ProjectsDetails/>}/>
                    <Route path='/projects/:projectId/edit' element={<EditProjectView/>}/>
                    <Route path='/projects/:projectId/team' element={<ProjectTeamView/>}/>

                    <Route element={<ProfileLayout/>}>
                        <Route path='/profile' element={<ProfileView/>}/>
                        <Route path='/profile/password-change' element={<ChangePasswordView/>}/>
                    </Route>
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path='/auth/login' element={<LoginView/>} />
                    <Route path='/auth/signup' element={<RegisterView/>} />
                    <Route path='/auth/confirm' element={<ConfirmAccountView/>} />
                    <Route path='/auth/request' element={<RequestNewCode/>} />
                    <Route path='/auth/reset' element={<ForgotPasswordView/>} />
                    <Route path='/auth/recover' element={<NewPasswordView/>} />
                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path='/404' element={<NotFound/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
