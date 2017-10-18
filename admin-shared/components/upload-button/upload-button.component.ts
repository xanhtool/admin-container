import { AngularRazService } from './../../services/angular-raz.service';
import { AdminFileService } from './../../services/admin-file.service';
import { FormGroup } from '@angular/forms';
import { Component,ElementRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';



@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.css'],
  animations:[
       trigger('imageState', [
            state('0', style({
                opacity:0
            })),
            state('1',   style({
                opacity:1
            })),
            transition('0 => 1', animate('2000ms ease-in')),
            transition('1 => 0', animate('300ms ease-out'))
        ]),
        trigger('loadingState', [
            state('0', style({
                opacity:0
            })),
            state('1',   style({
                opacity:1
            })),
            transition('0 => 1', animate('300ms ease-in')),
            transition('1 => 0', animate('2000ms ease-out'))
        ]),
  ],
})

export class UploadButtonComponent implements  OnChanges {
    @ViewChild('imageInput') imageInput: ElementRef;
    @Output() onDone = new EventEmitter<any>();
    @Input('imageLastValue') imageValue = {name:'',url:'',type:''};
    @Input('source') source:string = 'forget';
    @Input('imageName') name: string;

    // unitil
    @Input('mode') mode: string = 'normal';
    @Input('maxSize') maxSize: number = 1;
    @Input('maxWidth') maxWidth: number = 1000;
    @Input('maxHeight') maxHeight: number = 1000;

    imageLoaded:boolean = false;
    loading: boolean = false;
    utilityLoading: boolean = false;
    loadedPercent:number = 0;

    constructor(
        private adminFileService:AdminFileService,
        private angularRazService:AngularRazService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.imageValue && changes.imageValue.currentValue.url) {
            this.imageLoaded = true;
        }
    }

    deleteImage() {
        // Delete the file
        this.adminFileService.deleteImage(this.source+'/'+this.name+'.'+this.imageValue.type).then(() => {
            this.imageLoaded = false;
            this.onDone.emit({name:null,url:null,type:null})
            this.imageInput.nativeElement.value = '';
        }).catch(err => {
            this.imageLoaded = true;
        }
        );
    }

    readUrl(event) {
        this.utilityLoading = true;
        if (event.target.files && event.target.files[0]) {
            let fileTarget = event.target.files[0]
            // this.uploadImage(fileTarget)
            switch (this.mode) {
                case 'compress':
                    this.angularRazService.compressImage(fileTarget, this.maxSize, true)
                    .subscribe(
                        (result) => {
                            this.utilityLoading = false;
                            this.uploadImage(result);
                        },
                        (error) => {
                            this.utilityLoading = false;
                            this.uploadImage(error.compressedFile)
                            console.error("Compression error:", error);
                        }
                    )
                    break
                case 'compressAndResize':
                    
                    this.angularRazService.compressImage(fileTarget, this.maxSize, true)
                    .subscribe( 
                        result => {
                            this.angularRazService.resize(result,this.maxWidth, this.maxHeight).subscribe(result => {
                                this.utilityLoading = false;
                                this.uploadImage(result);
                            });
                        },
                        err => {
                            console.error('error when compressed',err)
                            this.utilityLoading = false;
                            this.uploadImage(err.compressedFile)
                        }
                )
                    break
                case 'resize':
                    // check Pica

                    // SOLUTION 1:
                    
                    // let pica = Pica({ features: [ 'js', 'wasm', 'ww', 'cib' ] }); 
                    // console.log('pica',pica);
                    // create from IMAGE
                    // let imageTarget = new Image();
                    // imageTarget.onload = (image) => {
                    //     let width  = imageTarget.naturalWidth  || imageTarget.width;
                    //     let height = imageTarget.naturalHeight || imageTarget.height; 
                    //     console.log('image when load',imageTarget,imageTarget.naturalWidth, imageTarget.width)
                    //     // To canvas
                    //     let toCanvas: HTMLCanvasElement = document.createElement('canvas');
                    //     toCanvas.width = width;
                    //     toCanvas.height = height;
                    //     pica.resize(imageTarget, toCanvas)
                    //     .then(result => pica.toBlob(result, 'image/jpeg', 90))
                    //     .then((blob:Blob) => {
                    //         console.log('resized to canvas & created blob!',blob,toCanvas);
                    //         this.utilityLoading = false;
                    //         let file:any = blob;
                    //         file.name = fileTarget.name;
                    //         // this.uploadImage(<File>file)
                    //     })
                    //     .catch(error => {
                    //         this.utilityLoading = false;
                    //         console.error('resizing error:' + error.message ,error);
                    //     })
                    // }
                    // // run 
                    // let url = URL.createObjectURL(fileTarget);
                    // imageTarget.src = url;
                    
                    // UPGRADE SOLUTION 1:
                    this.angularRazService.resize(fileTarget,this.maxWidth, this.maxHeight).subscribe(result => {
                                this.utilityLoading = false;
                                this.uploadImage(result);
                            });
                    
                    // SOLUTION 2:

                    // this.ng2ImgMaxService.resize([fileTarget], this.croppedWidth, this.croppedHeight)
                    // .subscribe( 
                    //     result => {}, 
                    // this.utilityLoading = false;
                    //         this.uploadImage(result)
                    //     err => {
                    //             this.utilityLoading = false;
                    //         console.error('error when resizing',err)
                    //         // this.uploadImage(err.resizedFile)
                    //     })

                    break
                  
                default:
                    this.utilityLoading = false;
                    this.uploadImage(fileTarget)
                    break
            }
        }
    }

      
    uploadImage(file) {
      this.loadedPercent = 0; // reset loadPercent
      this.adminFileService.uploadImage(file,this.source,this.name)
      .then((snapshot) => {
          this.imageLoaded = true;
          let fullname = snapshot.metadata.name.split('.')
          this.onDone.emit({name:fullname[0],url:snapshot.downloadURL,type:fullname[1]})
      })
      .catch(err => console.error('error coming!!!',err));

      this.adminFileService.loadPercent.subscribe(percent =>{
          this.loading= true;
          this.loadedPercent = percent;
          if (this.loadedPercent == 100) this.loading= false;
      })

  }
}
