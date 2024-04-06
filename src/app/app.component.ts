import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ItemManagementApp';

  itemForm: FormGroup;
  itemList: any[] = [];
  selectedIndex: number = -1;
  isEditMode: boolean = false;
  isSubmitMode: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      ItemName: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let data = localStorage.getItem('itemList');
    this.itemList = JSON.parse(data || '[]');
  }

  submit() {
    console.log(this.itemForm.value);
    if (this.isEditMode) {
      this.updateData();
    } else {
      this.addNewItem();
    }
    this.clear();
  }

  edit(i: number) {
    this.itemForm.patchValue({
      ItemName: this.itemList[i].ItemName,
      Description: this.itemList[i].Description,
    });
    this.selectedIndex = i;
    this.isEditMode = true;
    this.isSubmitMode = false;
  }

  updateData() {
    if (this.selectedIndex !== -1) {
      this.itemList[this.selectedIndex].ItemName = this.itemForm.value.ItemName;
      this.itemList[this.selectedIndex].Description = this.itemForm.value.Description;
      localStorage.setItem('itemList', JSON.stringify(this.itemList));
    }
    this.clearEditMode();
  }

  addNewItem() {
    this.itemList.push(this.itemForm.value);
    localStorage.setItem('itemList', JSON.stringify(this.itemList));
  }

  clear() {
    this.itemForm.reset();
    this.clearEditMode();
  }

  clearEditMode() {
    this.selectedIndex = -1;
    this.isEditMode = false;
    this.isSubmitMode = true;
  }

  delete(i: number) {
    this.itemList.splice(i, 1);
    localStorage.setItem('itemList', JSON.stringify(this.itemList));
  }
}
