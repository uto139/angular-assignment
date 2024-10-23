import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from '@features/blogs/blog.component';
import { RouteSegments } from '@shared/model/route-segments';


const routes: Routes = [
    { path: '', redirectTo: RouteSegments.blogs, pathMatch: 'full' },
    {
        path: RouteSegments.blogs,
        component: BlogComponent,
        title: $localize`:@@route.blogs:Blogs`
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
