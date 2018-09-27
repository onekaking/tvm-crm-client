import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClassCourseService {

	constructor(private http: HttpClient) { }

	getClassCourses() {
		return this.http.get(`${environment.apiUrl}/classcourse`);
	}

	postClassCourse(item: any) {
		return this.http.post(`${environment.apiUrl}/classcourse`, item);
	}

	findCourses(text) {
		return this.http.get(`${environment.apiUrl}/classcourse?where={"or":[
                                              {"name": {"contains": "${text}"}},
                                              {"code": {"contains": "${text}"}}
                                              ]}`);
	}

	getClassCourse(id) {
		return this.http.get(`${environment.apiUrl}/classcourse/${id}`);
	}
}
