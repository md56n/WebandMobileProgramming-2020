import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book = {};
  bookForm: FormGroup;
  isbn: string = '';
  title: string = '';
  description: string = '';
  author: string = '';
  publisher: string = '';
  published_year: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      'isbn': [null, Validators.required],
      'title': [null, Validators.required],
      'description': [null, Validators.required],
      'author': [null, Validators.required],
      'publisher': [null, Validators.required],
      'published_year': [null, Validators.required]
    });
    this.getBookDetails(this.route.snapshot.params['id']);
  }
  /**
   * This function is called to display current information of book.
   * @param id
   */
  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log('api returns');
        console.log(data);
        this.book = data;
      });
  }
  onFormSubmit(form: NgForm) { //form information
    this.api.updateBook(this.route.snapshot.params['id'], form)
      .subscribe(res => {

          const id = res['_id'];
          this.router.navigate(['/book-details', id]);
        }, (err) => {
          // console.log(form)
          console.log(err);
        }
      );
  }

}
