import { Component, OnInit,NgZone } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent implements OnInit{

  //propiedades:
  empleadoForm:FormGroup;
  enviado = false;
  empleadoDepartamento: any=[
    'Contabilidad', 'Finanzas', 'Recursos Humanos', 'TI', 'Ventas'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private empleadoService: EmpleadoService
  ){
    this.mainForm();
  }

  ngOnInit(): void { 
  }

//metodo para generar el formulario
mainForm(){
  this.empleadoForm = this.formBuilder.group({
    nombre: ['',[Validators.required]],
    departamento: ['',[Validators.required]],
    email:['',[
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ],
    ],
    telefono:['',[
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ],
    ]
  });
}

//metodo para asignar el departamento seleccionado por el usuario
actualizarDepartamento(d){
  this.empleadoForm.get('departamento').setValue(d,{
    onlySelf:true
  });
}

//getter oara acceder a los controles del formulario
get myForm(){
  return this.empleadoForm.controls;
}

//metodo para enviar el formulario
onSubmit(){
  this.enviado = true;
  if(!this.empleadoForm.valid){
    return false;
  }else{
    return this.empleadoService.agregarEmpleado(this.empleadoForm.value).subscribe({
      complete:()=>{
        console.log('empleado agregado correctamente')
        this.ngZone.run(()=> this.router.navigateByUrl('/listar-empleados'));
      },
      error:(e) =>{
        console.log(e);
      }
    });
  }
}

}
