import { Component, ViewEncapsulation } from '@angular/core';
import { Bill } from './bill.model';
import { SelectItem } from 'primeng/components/common/api';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BillComponent {
    bill: Bill = new Bill();
    currentDate: Date = new Date();
    sections: SelectItem[] = [];
    selectedSection: any;

    months: SelectItem[] = [];
    selectedMonth: any;

    staffs: SelectItem[] = [];
    selectedStaff: any;

    isGiftBalo: boolean = false;
    isGiftBook: boolean = false;

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

    constructor() {
        this.sections = [{
            label: 'Super Kid 1 / SUP1-2T1-1',
            value: 'SUP1-2T1-1'
        }, {
            label: 'Pre Staters / PRE-3T1-2',
            value: 'PRE-3T1-2'
        }, {
            label: 'Pre Staters / PRE-7S1-5',
            value: 'PRE-7S1-5'
        }, {
            label: 'Staters 2 / STA2-2T2-3',
            value: 'STA2-2T2-3'
        }, {
            label: 'Movers 1 / MOV1-7S1-6',
            value: 'MOV1-7S1-6'
        }];

        this.selectedSection = this.sections[0].value;

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
            label: 'Lâm Sơn Hùng',
            value: {
                id: 2,
                name: 'Lâm Sơn Hùng'
            }
        }, {
            label: 'Đinh Ngọc Hà',
            value: {
                id: 3,
                name: 'Đinh Ngọc Hà'
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
        this.selectedBookType = this.bookTypes[0].value;

        this.setupSection();
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
        if (this.selectedMonth === 0 ) { // Booking
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

    setupSection() {
        if (this.selectedSection === 'SUP1-2T1-1') {
            this.books = [{
                name: 'Hooray Student Book A1',
                price: 100000,
                total: 100000
            }, {
                name: 'Hooray Science & Math & Fine Motor A1',
                price: 90000,
                total: 90000
            }];
        } else if (this.selectedSection === 'PRE-3T1-2' || this.selectedSection === 'PRE-7S1-5') {
            this.books = [{
                name: 'ISS Student & Workbook 1A',
                price: 120000,
                total: 120000
            }];
        } else if (this.selectedSection === 'MOV1-7S1-6') {
            this.books = [{
                name: 'ISS Student & Workbook 4A',
                price: 170000,
                total: 170000
            }];
        } else if (this.selectedSection === 'STA2-2T2-3') {
            this.books = [{
                name: 'ISS Student & Workbook 2A',
                price: 170000,
                total: 170000
            }];
        }
        this.setupBalo();
        this.setupBook();
        // this.calculate();
    }

    calculate() {
        if (this.selectedSection === 'SUP1-2T1-1') {
            var temp = 1300000;
            if (this.selectedMonth === 1) {
                temp = temp * 0.8;
            } else if (this.selectedMonth === 3) {
                temp = temp * 3 * 0.9 * 0.8;
            } else if (this.selectedMonth === 6) {
                temp = temp * 6 * 0.8 * 0.8;
            } else if (this.selectedMonth === 12) {
                temp = temp * 12 * 0.7 * 0.8;
            }
            if (this.isHaveBrother) {
                temp = temp * 0.95;
            }
            this.studentFee = temp;
        } else {
            var temp = 1200000;
            if (this.selectedMonth === 1) {
                temp = temp * 0.8;
            } else if (this.selectedMonth === 3) {
                temp = temp * 3 * 0.9 * 0.8;
            } else if (this.selectedMonth === 6) {
                temp = temp * 6 * 0.8 * 0.8;
            } else if (this.selectedMonth === 12) {
                temp = 600000 * 12;
            }
            if (this.isHaveBrother) {
                temp = temp * 0.95;
            }
            this.studentFee = temp;
        }

        if (this.selectedMonth === 0) { // Booking Fee
            this.studentFee = 0;
        }

        if (this.isRelative) {
            this.totalStudentFee = 0;
        } else {
            this.totalStudentFee = this.studentFee;
        }
        console.log(this.totalStudentFee, this.totalBaloFee, this.totalBookFee, this.voucherFee, this.bookingFee);
        this.totalFee = (this.totalStudentFee + this.totalBaloFee + this.totalBookFee + this.voucherFee + parseFloat(this.bookingFee.toString()));
        this.remaining = this.totalFee - this.realPay;
    }

    getIndex() {
        return ++this.index;
    }

    print() {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
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
                padding: 20px;
                font-size: 14px;
            }
        table td {
            padding: 5px;
        }
          </style>
        </head>
    <body onload="window.print();window.close();">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }
}
