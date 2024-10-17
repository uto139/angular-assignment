import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlogPostEditDialogComponent } from './blog-post-edit-dialog/blog-post-edit-dialog.component';
import { BlogPostItemComponent } from './blog-post-item/blog-post-item.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';

@NgModule({
    declarations: [
        BlogPostItemComponent,
        BlogPostListComponent,
        BlogPostEditDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule],
    exports: [BlogPostListComponent]
})
export class BlogPostModule { }