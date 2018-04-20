import { Component, OnInit, ViewChild } from '@angular/core';
import { log } from 'util';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

class CatImage {
  message: string;
  api: string;
  fontsize: number;
}

class Button {
  text: string;
  disabled: boolean;
  color: string;
}

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.css']
})
export class ImgCardComponent implements OnInit {

  @ViewChild('scanner')  scanner: ZXingScannerComponent;
  hasCameras = false;
  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  hasPermission: boolean;
  qrResultString: string = null;

  // private image: CatImage = {
  //   message: 'Progressive Web Cat',
  //   api: 'https://cataas.com/cat/says/',
  //   fontsize: 40
  // };

  // public button: Button = {
  //   text: 'Give me another cat',
  //   color: 'primary',
  //   disabled: false
  // };

  // public src: string;

  constructor() { }
  
  ngOnInit() {

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;

      if (devices.length === 1) {
        this.selectedDevice = devices[0];
      }
      else {
        for (const device of devices) {
          if (/back|rear|environment/gi.test(device.label)) {
            this.scanner.changeDevice(device);
            this.selectedDevice = device;
            break;
          }
        }
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });

    // this.src = this.image.api + this.image.message + '?size=' + this.image.fontsize;

    // if (!navigator.onLine) {
    //   this.button.text = 'Sorry, you\'re offline';
    //   this.button.disabled = true;
    // }
  }

  handleQrCodeResult(resultString: string) {
    console.log('Result: ', resultString);
    this.qrResultString = resultString;
  }
  
  // public generateSrc(): void {
  //   this.src = this.src.replace(/\&ts=[\w]*/gi, '') + '&ts=' + Date.now();
  // }
}
