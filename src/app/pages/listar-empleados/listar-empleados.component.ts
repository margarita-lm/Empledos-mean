import { Component, OnInit} from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-listar-empleados',
  templateUrl: './listar-empleados.component.html',
  styleUrl: './listar-empleados.component.css'
})
export class ListarEmpleadosComponent implements OnInit{

  //propiedades
  empleados: any = [];

  constructor(private empleadoService:EmpleadoService){
    this.getEmpleados();
  }

  ngOnInit(): void {
  }

  //Metodo praa obtener a los empleados

  getEmpleados(){
    this.empleadoService.getEmpleados()
      .subscribe((data)=>{
        this.empleados=data;
      })
  };

  //metodo para eliminar empleado

  eliminarEmpleado(empleado, index){
    if(window.confirm('¿Estas seguro que lo deseas eliminar?')){
      this.empleadoService.deleteEmpleado(empleado._id)
      .subscribe((data)=>{
        this.empleados.splice(index,1);
      })
    }
  }
}
