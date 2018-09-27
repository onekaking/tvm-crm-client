import { Component, ViewEncapsulation } from '@angular/core';
import { Bill } from './bill.model';
import { SelectItem } from 'primeng/components/common/api';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { CourseService } from '../setting/course/course.service';
import { Course } from '../setting/course/course.model';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BillComponent {
    bill: Bill = new Bill();
    currentDate: Date = new Date();
    rawSections: SelectItem[] = [];
    sections: SelectItem[] = [];
    selectedSection: any;
    isDisabledSection: boolean = true;

    months: SelectItem[] = [];
    selectedMonth: any;

    staffs: SelectItem[] = [];
    selectedStaff: any;

    selectedValues: string[] = [];
    studentFee: number = 0;
    totalStudentFee: number = 0;

    books: any[] = [];

    bookFee: number = 0;
    totalBookFee: number = 0;
    baloFee: number = 0;
    totalBaloFee: number = 0;
    voucherFee: number = 0;
    totalFee: number = 0;

    realPay: number = 0;
    remaining: number = 0;

    isHaveVoucher: boolean = false;
    isHaveBrother: boolean = false;
    index: number = 0;

    isRelative: boolean = false;
    bookingFee: number = 0;

    baloTypes: SelectItem[] = [];
    selectedBaloType: any;

    bookTypes: SelectItem[] = [];
    selectedBookType: any;

    programs: SelectItem[] = [];
    selectedProgram: any;

    isDialogPayMoneyVisible: boolean = false;
    realPayByWords: string = '';

    courses: SelectItem[] = [];

    constructor(private courseService: CourseService) {
        this.initSetup();
    }

    initSetup() {
        this.isHaveBrother = false;
        this.isHaveVoucher = false;
        this.isRelative = false;
        this.selectedSection = null;

        this.loadCourses();

        // this.rawSections = [{
        //     label: 'Super Kid 1 / SUP1-2T1-1',
        //     value: {
        //         name: 'SUP1-2T1-1',
        //         program: 'Super Kids 1'
        //     }
        // }, {
        //     label: 'Pre Starters / PRE-3T1-2',
        //     value: {
        //         name: 'PRE-3T1-2',
        //         program: 'Pre Starters'
        //     }
        // }, {
        //     label: 'Pre Starters / PRE-7S1-5',
        //     value: {
        //         name: 'PRE-7S1-5',
        //         program: 'Pre Starters'
        //     }
        // }, {
        //     label: 'Pre Starters / PRE-3T1-8',
        //     value: {
        //         name: 'PRE-3T1-8',
        //         program: 'Pre Starters'
        //     }
        // }, {
        //     label: 'Starters 2 / STA2-2T2-3',
        //     value: {
        //         name: 'STA2-2T2-3',
        //         program: 'Starters 2'
        //     }
        // }, {
        //     label: 'Movers 1 / MOV1-7S1-6',
        //     value: {
        //         name: 'MOV1-7S1-6',
        //         program: 'Movers 1'
        //     }
        // }, {
        //     label: 'Movers 1 / MOV1-7C1-9',
        //     value: {
        //         name: 'MOV1-7C1-9',
        //         program: 'Movers 1'
        //     }
        // }, {
        //     label: 'Pre Starters / PRE-2T1-10',
        //     value: {
        //         name: 'PRE-2T1-10',
        //         program: 'Pre Starters'
        //     }
        // }];

        this.months = [{
            label: '1 tháng',
            value: 1
        }, {
            label: '3 tháng',
            value: 3
        }, {
            label: '6 tháng',
            value: 6
        }, {
            label: '12 tháng',
            value: 12
        }, {
            label: 'Đóng cọc',
            value: 0
        }];
        this.selectedMonth = this.months[0].value;

        this.staffs = [{
            label: 'Vương Thị Mỹ Nhi',
            value: {
                id: 1,
                name: 'Vương Thị Mỹ Nhi'
            }
        }, {
            label: 'Trần Thị Nhung',
            value: {
                id: 4,
                name: 'Trần Thị Nhung'
            }
        }];
        this.selectedStaff = this.staffs[0].value;

        this.baloTypes = [{
            label: 'Không mua',
            value: 0
        }, {
            label: 'Mua',
            value: 1
        }, {
            label: 'Được tặng',
            value: 2
        }];
        this.selectedBaloType = this.baloTypes[0].value;

        this.bookTypes = [{
            label: 'Không mua',
            value: 0
        }, {
            label: 'Mua',
            value: 1
        }, {
            label: 'Được tặng',
            value: 2
        }];
        // this.selectedBookType = this.bookTypes[0].value;

        // this.setupProgram();
        this.setupMonth();
    }

    calculteRelative() {
        if (this.isRelative) {
            this.selectedBaloType = 2; // Duoc tang
            this.selectedBookType = 2; // Duoc tang
            this.selectedMonth = 3;
        } else {
            this.selectedBaloType = 0; // Khong mua
            this.selectedBookType = 0; // Khong mua
            this.selectedMonth = 1;
        }
        this.setupBalo();
        this.setupBook();
    }

    setupBook() {
        if (this.selectedBookType === 1) { // Mua
            let temp = 0;
            this.books.forEach(item => {
                item.total = item.price;
                temp += item.price;
            });
            this.totalBookFee = temp;
        } else if (this.selectedBookType === 2) { // Được tặng
            this.books.forEach(item => {
                item.total = 0;
            });
            this.totalBookFee = 0;
        } else {
            this.totalBookFee = 0;
        }
        this.calculate();
    }

    setupBalo() {
        if (this.selectedBaloType === 1) { // Mua
            this.totalBaloFee = this.baloFee = 150000;
        } else if (this.selectedBaloType === 2) { // Được tặng
            this.baloFee = 150000;
            this.totalBaloFee = 0;
        } else {
            this.totalBaloFee = 0;
        }
        this.calculate();
    }

    setupMonth() {
        if (this.selectedMonth === 0) { // Booking
            this.selectedBaloType = 0; // Khong Mua
            this.selectedBookType = 0; // Khong Mua
            this.realPay = this.bookingFee;
        } else if (this.selectedMonth === 1) {
            this.selectedBaloType = 1; // Mua
            this.selectedBookType = 1; // Mua
            this.bookingFee = 0;
            this.realPay = 0;
        } else {
            this.selectedBaloType = 2; // Duoc tang
            this.selectedBookType = 2; // Duoc tang
            this.bookingFee = 0;
            this.realPay = 0;
        }
        this.setupBalo();
        this.setupBook();
    }

    setupVoucher() {
        if (this.isHaveVoucher) {
            this.voucherFee = -500000;
        } else {
            this.voucherFee = 0;
        }
        this.calculate();
    }

    setupProgram() {
        if (this.selectedProgram.name === 'Super Kids 1') {
            this.books = [{
                name: 'Hooray Student Book A1',
                price: 100000,
                total: 100000
            }, {
                name: 'Hooray Science & Math & Fine Motor A1',
                price: 90000,
                total: 90000
            }];
        } else if (this.selectedProgram.name === 'Super Kids 2') {
            this.books = [{
                name: 'Hooray Student Book A3',
                price: 100000,
                total: 100000
            }, {
                name: 'Hooray Science & Math & Fine Motor A3',
                price: 90000,
                total: 90000
            }];
        } else if (this.selectedProgram.name === 'Super Kids 3') {
            this.books = [{
                name: 'Hooray Student Book B2',
                price: 100000,
                total: 100000
            }, {
                name: 'Hooray Science & Math & Fine Motor B2',
                price: 90000,
                total: 90000
            }];
        } else if (this.selectedProgram.name === 'Pre Starters') {
            this.books = [{
                name: 'ISS Student & Workbook 1A',
                price: 120000,
                total: 120000
            }];
        } else if (this.selectedProgram.name === 'Starters 2') {
            this.books = [{
                name: 'ISS Student & Workbook 2A',
                price: 170000,
                total: 170000
            }];
        } else if (this.selectedProgram.name === 'Starters 3') {
            this.books = [{
                name: 'ISS Student & Workbook 3A',
                price: 170000,
                total: 170000
            }];
        } else if (this.selectedProgram.name === 'Movers 1') {
            this.books = [{
                name: 'ISS Student & Workbook 4A',
                price: 170000,
                total: 170000
            }];
        } else if (this.selectedProgram.name === 'Movers 2') {
            this.books = [{
                name: 'ISS Student & Workbook 5A',
                price: 170000,
                total: 170000
            }];
        }
        this.setupBalo();
        this.setupBook();

        // this.sections = this.rawSections.filter(item => item.value.program === this.selectedProgram);
        // this.selectedSection = null;
        // if (this.sections.length === 0) {
        //     this.isDisabledSection = true;
        // } else {
        //     this.isDisabledSection = false;
        // }

        if (this.selectedProgram == null || this.selectedProgram.classCourses.length === 0) {
            this.sections = [];
            this.selectedSection = null;
            this.isDisabledSection = true;
        } else {
            this.isDisabledSection = false;
            this.sections = [];
            this.selectedProgram.classCourses.filter(item => {
                this.sections.push({
                    label: item.code,
                    value: item
                });
            })
        }

    }

    calculate() {
        let temp = 1200000;
        let decreasePercent = 1;
        if (this.selectedProgram === 'Super Kids 1') {
            temp = 1300000;
        }
        if (this.selectedMonth === 3) {
            decreasePercent -= 0.1;
        } else if (this.selectedMonth === 6) {
            decreasePercent -= 0.2;
        } else if (this.selectedMonth === 12) {
            decreasePercent -= 0.3;
        }
        if (this.isHaveBrother) {
            decreasePercent -= 0.05;
        }
        temp = temp * this.selectedMonth * decreasePercent;
        this.studentFee = temp;

        if (this.selectedMonth === 0) { // Booking Fee
            this.studentFee = 0;
        }

        if (this.isRelative) {
            this.totalStudentFee = 0;
        } else {
            this.totalStudentFee = this.studentFee;
        }
        this.totalFee = (this.totalStudentFee + this.totalBaloFee + this.totalBookFee + this.voucherFee
            + parseFloat(this.bookingFee.toString()));
        this.remaining = this.totalFee - this.realPay;
    }

    getIndex() {
        return ++this.index;
    }

    reset() {
        this.bill.studentName = '';
        this.initSetup();
        this.setupProgram();
    }

    print() {
        let printContents, popupWin;
        printContents = document.getElementById('printSection').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto,fullscreen=yes');
        popupWin.document.open();
        popupWin.document.write(`
        <html>
            <head>
            <title>Print tab</title>
            <style>
            @page { size: auto;  margin: 0mm; }
            table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                }
                body {
                    font-size: 12px;
                    margin:0;
                    padding: 0;
                }
                table td {
                    padding: 5px;
                }
            </style>
            </head>
            <body onload="window.print();window.close();">
                <div style="height: 100%; padding: 20px; position: relative; width: 100%; box-sizing: border-box;">
                    ${printContents}
                    <div style="position: absolute; bottom: 20px; width: 100%; left: 0; text-align: center;">
                        <i>(Liên dành cho phụ huynh)</i>
                    </div>
                </div>
                <div style="height: 100%; padding: 20px; width: 100%; position: relative;box-sizing: border-box;">
                    ${printContents}
                    <div style="position: absolute; bottom: 20px; width: 100%; left: 0; text-align: center;">
                        <i>(Liên dành cho trung tâm)</i>
                    </div>
                </div>
            </body>
        </html>`
        );
        popupWin.document.close();
    }

    numberToEnglish(n, custom_join_character) {

        var string = n.toString(),
            units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

        var and = custom_join_character || 'và';

        /* Is number zero? */
        if (parseInt(string) === 0) {
            return 'không';
        }

        /* Array of units as words */
        units = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín',
            'mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy',
            'mười tám', 'mười chín'];

        /* Array of tens as words */
        tens = ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];

        /* Array of scales as words */
        scales = ['', 'ngàn', 'triệu', 'tỉ', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

        /* Split user arguemnt into 3 digit chunks from right to left */
        start = string.length;
        chunks = [];
        while (start > 0) {
            end = start;
            chunks.push(string.slice((start = Math.max(0, start - 3)), end));
        }

        /* Check if function has enough scale words to be able to stringify the user argument */
        chunksLen = chunks.length;
        if (chunksLen > scales.length) {
            return '';
        }

        /* Stringify each integer in each chunk */
        words = [];
        for (i = 0; i < chunksLen; i++) {

            chunk = parseInt(chunks[i]);

            if (chunk) {

                /* Split chunk into array of individual integers */
                ints = chunks[i].split('').reverse().map(parseFloat);

                /* If tens integer is 1, i.e. 10, then add 10 to units integer */
                if (ints[1] === 1) {
                    ints[0] += 10;
                }

                /* Add scale word if chunk is not zero and array item exists */
                if ((word = scales[i])) {
                    words.push(word);
                }

                /* Add unit word if array item exists */
                if ((word = units[ints[0]])) {
                    words.push(word);
                }

                /* Add tens word if array item exists */
                if ((word = tens[ints[1]])) {
                    words.push(word);
                }

                /* Add 'and' string after units or tens integer if: */
                if (ints[0] || ints[1]) {

                    /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
                    if (ints[2] || !i && chunksLen) {
                        words.push(and);
                    }

                }

                /* Add hundreds word if array item exists */
                if ((word = units[ints[2]])) {
                    words.push(word + ' trăm');
                }

            }

        }

        return words.reverse().join(' ');

    }

    onChangePayMoney() {
        if (this.realPay > this.totalFee) {
            this.realPay = this.totalFee;
        }
        this.realPayByWords = this.numberToEnglish(this.realPay, '');
        this.calculate();
    }

    onFocusPayMoney($event) {
        $event.target.select();
    }

    showDialogPayMoney() {
        this.isDialogPayMoneyVisible = true;
    }

    checkout(isPay) {
        if (isPay) {
            this.print();
        }
        this.isDialogPayMoneyVisible = false;
    }

    onShowDialog() {
        document.getElementById('inputMoney').focus();
        this.realPayByWords = this.numberToEnglish(this.realPay, '');
    }

    payFullMoney() {
        this.realPay = this.totalFee;
        this.onChangePayMoney();
    }

    loadCourses() {
        this.courseService.getCourses().subscribe((data: Course[]) => {
            this.courses = [];
            data.map(item => {
                this.programs.push({
                    label: item.name,
                    value: item
                });
            });
            // this.selectedProgram = this.programs[0].value;
        });
    }
}
