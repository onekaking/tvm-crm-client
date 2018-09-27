import { Component, ViewEncapsulation } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/components/common/api';
import { ClassCourse } from './class-course.model';
import { ClassCourseService } from './class-course.service';
import { CourseService } from '../course/course.service';
import { Course } from '../course/course.model';

@Component({
    selector: 'app-class-course',
    templateUrl: './class-course.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassCourseComponent {
    classCourses: ClassCourse[] = [];
	isDialogAddClassCourseVisible: boolean = false;
	newClassCourse: ClassCourse = new ClassCourse();
    isLoading: boolean = false;
    courses: SelectItem[] = [];
    selectedCourse: any;

	constructor(private classCourseService: ClassCourseService, private courseService: CourseService) {
        this.loadCourses();
        this.loadClassCourses();
	}

	showDialogAddClassCourse() {
		this.newClassCourse = new ClassCourse();
		this.isDialogAddClassCourseVisible = true;
	}

	loadClassCourses() {
		this.isLoading = true;
		this.classCourseService.getClassCourses().subscribe((data: ClassCourse[]) => {
			this.classCourses = [];
			data.map(item => {
				this.classCourses.push(item);
			});
			this.isLoading = false;
		});
    }

    loadCourses() {
		this.courseService.getCourses().subscribe((data: Course[]) => {
			this.courses = [];
			data.map(item => {
				this.courses.push({
                    label: item.name,
                    value: item.id
                });
			});
		});
	}

	createNewClassCourse(isCreate) {
		if (isCreate) {
            this.newClassCourse.course = this.selectedCourse;
			this.classCourseService.postClassCourse(this.newClassCourse).subscribe(data => {
				this.isDialogAddClassCourseVisible = false;
				this.loadClassCourses();
			});
		} else {
            this.newClassCourse = new ClassCourse();
            this.selectedCourse = null;
			this.isDialogAddClassCourseVisible = false;
		}
	}

}
