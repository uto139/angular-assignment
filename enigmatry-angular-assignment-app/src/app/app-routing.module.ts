import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from '@features/blogs/blog.component';
import { ProfileComponent } from '@features/profile/profile.component';
import { RouteSegments } from '@shared/model/route-segments';


const routes: Routes = [
    { path: '', redirectTo: RouteSegments.blogs, pathMatch: 'full' },
    {
        path: RouteSegments.blogs,
        component: BlogComponent,
        title: $localize`:@@route.blogs:Blogs`
    },
    {
        path: RouteSegments.profile,
        component: ProfileComponent,
        title: $localize`:@@route.profile:Profile`
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
