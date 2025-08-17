import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { SidebarComponent } from './layout/sidebar.component';
import { FooterComponent } from './layout/footer.component';
import { HomeComponent } from './home/home.component';
import { PokemonCardComponent } from './pokemon/shared/pokemon-card.component';
import { PokemonListComponent } from './pokemon/list/pokemon-list.component';
import { PokemonDetailDialog } from './pokemon/detail/pokemon-detail.dialog';
import { SafeUrlPipe } from './shared/safe-url.pipe';
import { FavoritesComponent } from './pokemon/favorites/favorites.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './store';
import { PokemonEffects } from './pokemon/state/pokemon.effects';
import { AuthInterceptor } from './core/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, SidebarComponent, FooterComponent,
    HomeComponent, PokemonCardComponent, PokemonListComponent, PokemonDetailDialog,
    FavoritesComponent, LoginComponent, SignupComponent, SafeUrlPipe
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, MaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([PokemonEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
