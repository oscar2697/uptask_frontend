import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateProjectView from '@/views/projects/CreateProjectView'
import EditProjectView from './views/projects/EditProjectView'
import ProjectsDetails from './views/projects/ProjectsDetails'


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path='/' element={<DashboardView/>} index />
                    <Route path='/projects/create' element={<CreateProjectView/>}/>
                    <Route path='/projects/:projectId' element={<ProjectsDetails/>}/>
                    <Route path='/projects/:projectId/edit' element={<EditProjectView/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
