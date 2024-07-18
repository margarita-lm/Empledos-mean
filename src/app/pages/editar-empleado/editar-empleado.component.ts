import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent implements OnInit {

  //propiedades:
  editarEmpleadoForm:FormGroup;
  enviado = false;
  empleadoDepartamento: any=[
    'Contabilidad', 'Finanzas', 'Recursos Humanos', 'TI', 'Ventas'
  ];
  empleadoData :Empleado[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private actRoute : ActivatedRoute
  ){}

  ngOnInit(): void { 
    this.mainForm();
    let id= this.actRoute.snapshot.paramMap.get('id');
    this.getEmpleado(id);
    this.editarEmpleadoForm = this.formBuilder.group({
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

//metodo para generar el formulario
mainForm(){
  this.editarEmpleadoForm = this.formBuilder.group({
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
  this.editarEmpleadoForm.get('departamento').setValue(d,{
    onlySelf:true
  });
}

//getter oara acceder a los controles del formulario
get myForm(){
  return this.editarEmpleadoForm.controls;
}

//metodo para buscar el empleado de la base de datos con base a su ID

getEmpleado(id){
  this.empleadoService.getEmpleado(id).subscribe((data)=>{
    this.editarEmpleadoForm.setValue({
      nombre : data['nombre'],
      departamento : data['departamento'],
      email : data['email'],
      telefono : data['telefono']
    });
  });
}



//metodo para enviar el formulario
onSubmit(){
  this.enviado = true;
  if(!this.editarEmpleadoForm.valid){
    return false;
  }else{
    if(window.confirm('¿Estas seguro de que lo deseas modificar?')){
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.empleadoService.updateEmpleado(id,this.editarEmpleadoForm.value).subscribe({
        complete:()=>{
          this.router.navigateByUrl('/listar-empleados');
          console.log('se actializo correctamente');
        },
        error:(e)=>{
          console.log(e);
        }
      });
    }
  }
}



}
