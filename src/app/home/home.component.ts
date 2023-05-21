import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['empId', 'name', 'email', 'actions'];
  data = [];
  empForm!: UntypedFormGroup;
  status: boolean = true;
  emp_id = '';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource(this.data);

  constructor(
    private dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private empService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.empFormValidators();
    this.getEmpData();

  }

  //get employee data
  getEmpData() {
    this.empService.getEmpData().subscribe((res: any) => {
      this.data = res;
      this.data.forEach((elem: any, i: number) => {
        elem['emp_id'] = i + 1
      })
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    })
  }

  //add employee data
  openDialog(ref: any) {
    this.status = true;
    this.empFormValidators();
    this.dialog.open(ref, {
      width: '300px'
    })
  }

  submit() {
    if (this.empForm.valid) {
      this.empService.addEmp(this.empForm.value).then((res) => {
      })
      this.dialog.closeAll()
    }
  }

  //edit employee data
  edit(data: any, ref: any) {
    this.status = false;
    this.emp_id = data.id;
    this.dialog.open(ref, {
      width: '300px'
    })
    this.empForm.get('email')?.setValue(data.email);
    this.empForm.get('name')?.setValue(data.name)
  }
  update() {
    this.empService.updateEmp(this.empForm.value, this.emp_id);
    this.dialog.closeAll();
  }

  //delete employee data
  deleteCnf(data: any, ref: any) {
    this.emp_id = data.id;
    this.dialog.open(ref, {
      width: '250px'
    })
  }
  delete() {
    this.empService.deleteEmp(this.emp_id);
    this.dialog.closeAll();
  }

  //form validations
  empFormValidators() {
    this.empForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]]
    })
  }

}
