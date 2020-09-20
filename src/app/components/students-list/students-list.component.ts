import { Student } from './../../shared/student';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/Paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  StudentData: any = [];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'studentName', 'studentEmail', 'section', 'action'];

  constructor(
    private studentApi: ApiService
  ) {
    this.studentApi.GetStudent().subscribe(students => {
      this.StudentData = students;
      this.dataSource = new MatTableDataSource<Student>(this.StudentData);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  ngOnInit(): void {
  }

  deleteStudent(index: number, e): void {
    if(window.confirm('Are you sure you want to delete')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e.id).subscribe();
    }
  }

}
