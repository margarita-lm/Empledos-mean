import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { ListarEmpleadosComponent } from './pages/listar-empleados/listar-empleados.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'agregar-empleado'},
  {path:'agregar-empleado',component:AgregarEmpleadoComponent},
  {path:'listar-empleados',component:ListarEmpleadosComponent},
  {path:'editar-empleado/:id',component:EditarEmpleadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
