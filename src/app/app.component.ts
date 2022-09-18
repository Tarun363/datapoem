import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  search = 'jan 2022';
  count: number = 3;
  monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  selectedDate: Date = new Date();
  displayedValues = [
    { val: 'Jan', same: true }
  ];

  ngOnInit(): void {
    this.onType();
  }

  onType() {
    try {
      this.selectedDate = new Date(this.search);
    } catch (e) {
      this.selectedDate = new Date();
    }
    this.display();
  }

  display() {
    let showNextYear = false;
    this.displayedValues = [];
    const month = this.selectedDate.getMonth();
    let startIdx = month;
    let endIdx = 0;
    let totalCount = month + Number(this.count);

    if (totalCount <= this.monthsList.length) {
      endIdx = totalCount;
    } else if (totalCount > 12) {
      endIdx = 12;
      showNextYear = true;
    }

    for (let i = startIdx; i < endIdx; i++) {
      const obj = {
        val: this.monthsList[i] + ` ${this.selectedDate.getFullYear()}`,
        same: true
      }
      this.displayedValues.push(obj);
    }

    if (showNextYear) {

      let nextYearIdx = 0;
      if (totalCount - this.monthsList.length > 12) {
        nextYearIdx = 12;
      } else {
        nextYearIdx = totalCount - this.monthsList.length;
      }

      for (let i = 0; i < nextYearIdx; i++) {
        const obj = {
          val: this.monthsList[i] + ` ${this.selectedDate.getFullYear() + 1} `,
          same: false
        }
        this.displayedValues.push(obj);
      }

    }
  }

}
