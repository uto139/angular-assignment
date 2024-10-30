import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteSegments } from '@shared/model/route-segments';


const routes: Routes = [
    {
        path: RouteSegments.root,
        redirectTo: RouteSegments.blogs,
        pathMatch: 'full'
    },
    {
        path: RouteSegments.blogs,
        loadChildren: () => import('./features/blogs/blogs.module').then(module => module.BlogsModule),
        title: $localize`:@@route.blogs:Blogs`
    },
    {
        path: RouteSegments.profile,
        loadChildren: () => import('./features/profiles/profiles.module').then(module => module.ProfilesModule),
        title: $localize`:@@route.profile:Profile`
    },
    {
        path: RouteSegments.errors,
        loadChildren: () => import('./features/errors/errors.module').then(module => module.ErrorsModule)
    },
    { path: '**', redirectTo: RouteSegments.blogs }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
