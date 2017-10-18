import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { AdminEmailService } from './services/admin-email.service';
import { AdminFileService } from './services/admin-file.service';
import { DragDropService } from './services/drag-drop.service';
import { AdminComponentService } from './services/admin-component.service';
import { AdminPostService } from './services/admin-post.service';
import { SnackbarService } from './services/snackbar.service';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { EventService } from './services/event.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSharedRoutingModule } from './admin-shared-routing.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ContenteditableModelDirective } from './directives/contenteditable-model.directive';
import { SlugPipe } from './pipes/slug.pipe';
import { MakeDraggableDirective } from './directives/make-draggable.directive';
import { MakeDroppableDirective } from './directives/make-droppable.directive';
import { AdminLoaderComponent } from './components/admin-loader/admin-loader.component';
import { AngularRazService } from './services/angular-raz.service'
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AdminSharedRoutingModule,
    MatInputModule,
    ReactiveFormsModule, 
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    CdkTableModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
  ],
  exports: [
    ContenteditableModelDirective,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule, 
    FroalaEditorModule, 
    FroalaViewModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    CdkTableModule,
    MatCardModule,
    MatIconModule,
    UploadButtonComponent,
    MakeDraggableDirective,
    MakeDroppableDirective,
    SlugPipe,
    MatRadioModule,
    AdminLoaderComponent,
  ],
  declarations: [
    ContenteditableModelDirective,
    UploadButtonComponent,
    SlugPipe, 
    MakeDraggableDirective, 
    MakeDroppableDirective, AdminLoaderComponent
  ],
  providers: [
    AdminComponentService,
    EventService,
    SnackbarService,
    AdminPostService,
    DragDropService,
    AdminFileService,
    AdminEmailService,
    AngularRazService
  ],
  entryComponents:[]
})
export class AdminSharedModule { }
