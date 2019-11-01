import { Component, OnInit, ElementRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-vip',
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.css']
})
export class VipComponent implements OnInit, OnDestroy{

  constructor(private elementRef: ElementRef) { }

  isLive = false;
  isProduct = false;
  isCountdown = false;
  isBreakdown = false;
  isEffect = false;

  srcObject = null;
  throttle = false;
  canvasCTX = null;
  videoObj = null;
  canvasWidth = 0;
  canvasHeight = 0;
  constraints = {
    audio: false,
    video: {
    facingMode: 'user' // // Can be 'user' or 'environment' to access back or front camera (NEAT!)
    }
  };

  ngOnInit() {}

  ngOnDestroy() {
    this.isLive = false;
    this.closeStream();
  }

  videoToggle() {
    if (this.throttle) {
      return;
    } else {
      this.throttle = true;
      setTimeout(() => {
        this.throttle = false;
      }, 1000);
    }
    this.isLive = !this.isLive;
    if (this.isLive) {
      this.openSteam();
    } else {
      this.closeStream();
    }
  }
  openSteam() {
    this.closeStream();
    navigator.mediaDevices.getUserMedia(this.constraints).then((stream) => {
      this.srcObject = stream;
    });
  }

  closeStream() {
    if (this.srcObject) {
      this.srcObject.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  videoInit($event) {
    this.canvasCTX = this.elementRef.nativeElement.querySelector('#liveCanvas').getContext('2d');
    this.videoObj = this.elementRef.nativeElement.querySelector('#liveVideo');
    this.canvasWidth = this.videoObj.videoWidth;
    this.canvasHeight = this.videoObj.videoHeight;
  }

  videoPlay() {
    const loop = () => {
      if (this.isLive) {
        this.canvasDraw();
        setTimeout(() => {
            loop();
        }, 1000 / 30);
      }
    };
    loop();
  }

  canvasDraw() {
    if (!this.canvasCTX) { return; }
    this.canvasCTX.drawImage(this.videoObj, 0, 0);
    if (this.isEffect) { this.canvasEffect(this.canvasCTX); }
    this.canvasDrawContdown(this.canvasCTX);
  }

  canvasEffect(ctx) {
    const numTileRows = 30;
    const numTileCols = 30;

    const tileWidth = this.canvasWidth / numTileCols;
    const tileHeight = this.canvasHeight / numTileRows;

    const imageData = this.canvasCTX.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    const pixels = imageData.data;
    // 馬賽克主要演算邏輯
    for (let r = 0; r < numTileRows; r++) {
      for (let c = 0; c < numTileCols; c++) {
          const x = (c *  tileWidth) + (tileWidth / 2);
          const y = (r * tileHeight) + (tileHeight / 2);
          const pos = (Math.floor(y) * (this.canvasWidth * 4)) + (Math.floor(x) * 4);
          // 取得顏色
          const red = pixels[pos];
          const green = pixels[pos + 1];
          const blue = pixels[pos + 2];
          // 重新填滿色塊
          ctx.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
          ctx.fillRect(x - (tileWidth / 2), y - (tileHeight / 2), tileWidth, tileHeight);
      }
    }
  }

  canvasDrawContdown(ctx) {
    ctx.fillStyle = 'Red';
    ctx.font = '20pt Arial';
    ctx.fillText('Sample String', 20, 40);
  }
}
