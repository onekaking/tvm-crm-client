import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CourseService {

	constructor(private http: HttpClient) { }

	getCourses() {
		return this.http.get(`${environment.apiUrl}/course`);
	}

	postCourse(Course: any) {
		return this.http.post(`${environment.apiUrl}/course`, Course);
	}

	findCourses(text) {
		return this.http.get(`${environment.apiUrl}/course?where={"or":[
                                              {"name": {"contains": "${text}"}},
                                              {"code": {"contains": "${text}"}}
                                              ]}`);
	}

	getCourse(id) {
		return this.http.get(`${environment.apiUrl}/course/${id}`);
	}
}
