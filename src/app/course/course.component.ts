import { Component, ViewEncapsulation } from '@angular/core';
import { Course } from './course.model';
import { CourseService } from './course.service';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
	courses: Course[] = [];
	isDialogAddCourseVisible: boolean = false;
	newCourse: Course = new Course();
	isLoading: boolean = false;

	constructor(private courseService: CourseService) {
		this.loadCourses();
	}

	showDialogAddCourse() {
		this.newCourse = new Course();
		this.isDialogAddCourseVisible = true;
	}

	loadCourses() {
		this.isLoading = true;
		this.courseService.getCourses().subscribe((data: Course[]) => {
			this.courses = [];
			data.map(item => {
				this.courses.push(item);
			});
			this.isLoading = false;
		});
	}

	createNewCourse(isCreate) {
		if (isCreate) {
			this.courseService.postCourse(this.newCourse).subscribe(data => {
				this.isDialogAddCourseVisible = false;
				this.loadCourses();
			});
		} else {
			this.isDialogAddCourseVisible = false;
		}
	}
}
